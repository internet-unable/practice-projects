import Heading from "../Heading/Headng";

export default function Panel({ data }) {
    return (
        <div className="panel">
            <div>
                <img src={data.image} />
                <Heading tag="h1">{data.title}</Heading>
                <p>{data.description}</p>
            </div>

            <div className="preparation">
                <Heading tag="h3">{data.preparation.title}</Heading>
                <ul>
                    {data.preparation.items.map(item => (
                        <li key={item.key}>
                            <div className="content"><b>{item.key}</b>: {item.value}</div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="ingredients">
                <Heading tag="h2">{data.ingredients.title}</Heading>
                <ul>
                    {data.ingredients.items.map(item => (
                        <li key={item}>
                            <div className="content">{item}</div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="instructions">
                <Heading tag="h2">{data.instructions.title}</Heading>
                <ul>
                    {data.instructions.items.map(item => (
                        <li key={item.key}>
                            <div className="content"><b>{item.key}</b>: {item.value}</div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="nutrition">
                <Heading tag="h2">{data.nutrition.title}</Heading>
                <p>{data.nutrition.description}</p>
                <ul>
                    {data.nutrition.items.map(item => (
                        <li key={item.key}>
                            <div className="col col-title">
                                <span>{item.key}</span>
                            </div>
                            <div className="col col-desc">
                                <span><b>{item.value}</b></span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}