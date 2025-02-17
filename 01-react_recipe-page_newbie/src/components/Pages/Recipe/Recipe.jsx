import Card, { cardSizes } from "../../UI/Card/Card";
import Heading from "../../UI/Heading/Heading";
import List, { listStyles } from "../../UI/List/List";
import Divider from "../../UI/Divider/Divider";
import Table from "../../UI/Table/Table";

import styles from "./Recipe.module.css";

const listPaddingBottom = {
    paddingBottom: "1.938rem"
}

export default function Recipe({ data }) {
    return (
        <section className={styles["recipe-page"]}>
            <Card
                cardSize={cardSizes.L}
                cardHeader={<img src={data.image} />}
                cardBody={
                    <>
                        <Heading tag="h1">{data.title}</Heading>
                        <p>{data.description}</p>

                        <Card
                            className="bg-rose--50"
                            cardSize={cardSizes.S}
                            cardBody={
                                <>
                                    <Heading tag="h3" className="font-outfit--bold color-rose--800">{data.preparation.title}</Heading>
                                    <List data={data.preparation.items} listStyle={listStyles.defaultBgRose800} />
                                </>
                            }>
                        </Card>

                        <Heading tag="h2" className="color-brown--800">{data.ingredients.title}</Heading>
                        <List data={data.ingredients.items} listStyle={listStyles.squareBgBrown800} style={listPaddingBottom} />
                        <Divider />

                        <Heading tag="h2" className="color-brown--800">{data.instructions.title}</Heading>
                        <List data={data.instructions.items} listStyle={listStyles.decimalCBrown800} style={listPaddingBottom} />
                        <Divider />

                        <Heading tag="h2" className="color-brown--800">{data.nutrition.title}</Heading>
                        <p style={{ marginBottom: "26px" }}>{data.nutrition.description}</p>
                        <Table data={data.nutrition.items} />
                    </>
                }>
            </Card>
        </section>
    );
}