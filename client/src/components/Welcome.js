function Welcome(){
    const baseURL = window.location.href;
    return(
        <div className="wrapper welcome">
            <p>Welcome! This is a microservice for files.  You can upload a file and the file name, type, and size will be displayed.  You can also view the file directly at <a href={baseURL+"api/view/<filename>"} target="_blank" rel="noopener noreferrer">[baseurl]/api/view/&lt;filename&gt;</a> where &lt;filename&gt; is replaced by the given file name (including file type).</p>
        </div>
    )
}

export default Welcome;