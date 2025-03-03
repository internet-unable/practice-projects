import { useState } from "react";

import Header from "../Sections/Header/Header";
import Heading from "../UI/Heading/Heading";
import Paragraph, { paragraphStyles } from "../UI/Paragraph/Paragraph";
import Form from "../Sections/Form/Form";
import Ticket from "../Sections/Ticket/Ticket";

export default function TicketGenerator() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    let headingContent = <>Your Journey to Coding Conf<br />2025 Starts Here!</>;
    let paragraphContent = <>Secure your spot at next year`s biggest coding conference.</>;

    if (name) {
        headingContent = <>Congrats, <span className="c-gradient--orange-white">{name}!</span><br />Your ticket is ready.</>;
    }

    if (email) {
        paragraphContent = <>We've emailed your ticket to<br /><span className="c-orange--700">{email}</span> and will send updates in<br />the run up to the event.</>
    }

    function handleFormSubmit() {
        setName("Jonatan Kristof");
        setEmail("jonatan@email.com");
    }

    return (
        <>
            <Header />

            <main style={{ paddingTop: name ? "70px" : "60px", paddingBottom: "140px" }}>
                <section className="text--center" style={{ marginBottom: name ? "110px" : "48px" }}>
                    <Heading tag="h1" style={{marginBottom: name && "33px"}}>{headingContent}</Heading>
                    <Paragraph paragraphStyle={paragraphStyles.size23}>{paragraphContent}</Paragraph>
                </section>

                <section className="margin--center" style={{ width: "600px" }}>
                    {!name && (
                        <Form onSubmit={handleFormSubmit} />
                    )}

                    {name && (
                        <Ticket />
                    )}
                </section>
            </main>
        </>
    );
}