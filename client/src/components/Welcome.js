function Welcome(){
    const baseURL = window.location.href;
    return(
        <div className="wrapper">
            <p>Welcome! This is a microservice for files.  You can upload a file and the file name, type, and size will be displayed.  You can also view the file directly at <a href={baseURL+"api/view/"} target="_blank" rel="noopener noreferrer">[baseurl]/api/view/</a>&lt;filename&gt; where &lt;filename&gt; is replaced by the given file name.</p>
        </div>
    )
}

export default Welcome;