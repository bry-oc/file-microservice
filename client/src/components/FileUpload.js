import React from 'react';

function FileUpload() {
    const [warning, setWarning] = React.useState("");
    const [alert, setAlert] = React.useState("");
    const [name, setName] = React.useState("");
    const [type, setType] = React.useState("");
    const [size, setSize] = React.useState("");

    const baseURL = window.location.href;

    let uploadFile = (e) => {
        e.preventDefault();
        const file = e.target.upfile.files[0];
        if (file === undefined) {
            setWarning("Please select a file.");
            setAlert("");
            setName("");
            setType("");
            setSize("");
            return;
        }
        const formData = new FormData();
        formData.append('upfile', file);

        const url = '/api/fileanalyse';

        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setWarning(data.error);
                    setAlert("");
                    setName("");
                    setType("");
                    setSize("");
                } else {
                    setWarning("");
                    setAlert("File Uploaded!");
                    setName(data.name);
                    setType(data.type);
                    setSize(data.size);
                }
            })
    }

    return (
        <div className="wrapper">
            <form enctype="multipart/form-data" method="POST" action="/api/fileanalyse">
                <input type="file" name="upfile" id="upfile"></input>
                <br></br><br></br>
                <input type="submit" value="Upload"></input>
            </form>
            <div className="feedback">
                {warning !== "" ? <p className="feedback">{warning}</p> : null}
                {alert !== "" ? <p className="feedback" id="alert">{alert}</p> : null}
                {name !== "" ? <p className="feedback">File name: <a href={baseURL+"api/view/"+name} target="_blank" rel="noopener noreferrer">{name}</a></p> : null}
                {type !== "" ? <p className="feedback">Type: {type}</p> : null}
                {size !== "" ? <p className="feedback">Size: {size} Bytes</p> : null}
            </div>
        </div>
    );
}

export default FileUpload;