import Card, { CARD_SIZES } from "../../UI/Card/Card";
import Heading from "../../UI/Heading/Heading";
import List, { LIST_TYPES, LIST_STYLES } from "../../UI/List/List";
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
                cardSize={CARD_SIZES.LARGE}
                cardHeader={<img src={data.image} />}
                cardBody={
                    <>
                        <Heading tag="h1">{data.title}</Heading>
                        <p>{data.description}</p>

                        <Card
                            className="bg-rose--50"
                            cardSize={CARD_SIZES.SMALL}
                            cardBody={
                                <>
                                    <Heading tag="h3" className="font-outfit--bold color-rose--800">{data.preparation.title}</Heading>
                                    <List data={data.preparation.items} listType={LIST_TYPES.UNORDERD} listStyle={LIST_STYLES.DEFAULT_BG_ROSE_800} />
                                </>
                            }>
                        </Card>

                        <Heading tag="h2" className="color-brown--800">{data.ingredients.title}</Heading>
                        <List data={data.ingredients.items} listType={LIST_TYPES.UNORDERD} listStyle={LIST_STYLES.SQUARE_BG_BROWN_800} style={listPaddingBottom} />
                        <Divider />

                        <Heading tag="h2" className="color-brown--800">{data.instructions.title}</Heading>
                        <List data={data.instructions.items} listType={LIST_TYPES.ORDERD} listStyle={LIST_STYLES.DECIMAL_C_BROWN_800} style={listPaddingBottom} />
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