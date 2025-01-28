export default function Panel({ data }) {
    return (
        <div className="panel">
            <img src={data.image} />
            <h1>This is panel</h1>
        </div>
    );
}