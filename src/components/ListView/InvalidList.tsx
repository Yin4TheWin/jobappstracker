import '../../styles/JobListView.css'

export default function InvalidList(){
    return (<div className="error-header">
    <h1>Sorry 😢</h1>
    <p style={{alignSelf: 'center'}}>Either the page you are looking for does not exist, or you are not allowed to view it.</p>
    <p className="mini" style={{alignSelf: 'center'}}>(If you believe this is a mistake, please ensure you are signed in to the right account, then come back to this page.)</p>
</div>)
}