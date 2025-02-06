import styled from "styled-components";
import Heading from "../Heading/Heading";

const StyledH2 = styled(Heading)`
    color: var(--color-brown--800);
`;

const StyledH3 = styled(Heading)`
    color: var(--color-rose--800);
    font-family: var(--font-outfit--bold);
`;

export default function Panel({ data }) {
    return (
        <div className="panel">
            <div>
                <img src={data.image} />
                <Heading tag="h1">{data.title}</Heading>
                <p>{data.description}</p>
            </div>

            <div className="preparation">
                <StyledH3 tag="h3">{data.preparation.title}</StyledH3>
                <ul>
                    {data.preparation.items.map(item => (
                        <li key={item.key}>
                            <div className="content"><b>{item.key}</b>: {item.value}</div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="ingredients">
                <StyledH2 tag="h2">{data.ingredients.title}</StyledH2>
                <ul>
                    {data.ingredients.items.map(item => (
                        <li key={item}>
                            <div className="content">{item}</div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="instructions">
                <StyledH2 tag="h2">{data.instructions.title}</StyledH2>
                <ul>
                    {data.instructions.items.map(item => (
                        <li key={item.key}>
                            <div className="content"><b>{item.key}</b>: {item.value}</div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="nutrition">
                <StyledH2 tag="h2">{data.nutrition.title}</StyledH2>
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