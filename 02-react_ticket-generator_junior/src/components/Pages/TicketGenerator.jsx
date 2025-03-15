// import { useFormStatus } from "react-dom";
import { useState } from "react";

import Container, { containerStyles } from "../UI/Container/Container";
import Header from "../Sections/Header/Header";
import Heading from "../UI/Heading/Heading";
import Paragraph, { paragraphStyles } from "../UI/Paragraph/Paragraph";
import Form from "../Sections/Form/Form";
import Ticket from "../Sections/Ticket/Ticket";

export default function TicketGenerator() {
    // const { pending, data, method, action } = useFormStatus();
    const [state, setState] = useState({
        userName: null,
        userEmail: null,
        isFormSubmitedSuccess: false
    });

    function handleFormSubmit() {
        setState(prevState => {
            return {
                ...prevState,
                userName: "Jonatan Kristof",
                userEmail: "jonatan@email.com",
                isFormSubmitedSuccess: true
            };
        });
    }

    return (
        <>
            <Header />

            <main style={{ marginBottom: "120px" }}>
                {!state.isFormSubmitedSuccess && (
                    <>
                        <Container className="text--center" containerStyle={containerStyles.maxWidth800}>
                            <Heading
                                tag="h1"
                                style={{ marginBottom: "33px" }}
                            >
                                Your Journey to Coding Conf 2025 Starts Here!
                            </Heading>

                            <Paragraph
                                paragraphStyle={paragraphStyles.size23}
                            >
                                Secure your spot at next year`s biggest coding conference.
                            </Paragraph>
                        </Container>

                        <Container containerStyle={containerStyles.maxWidth462} style={{ marginTop: "48px" }}>
                            <Form onSubmit={handleFormSubmit} />
                        </Container>
                    </>
                )}

                {state.isFormSubmitedSuccess && (
                    <>
                        <Container className="text--center" containerStyle={containerStyles.maxWidth800}>
                            <Heading
                                tag="h1"
                                style={{ marginBottom: "20px" }}
                            >
                                Congrats, <span className="c-gradient--orange-white">{state.userName}</span>! Your ticket is ready.
                            </Heading>

                            <Paragraph
                                paragraphStyle={paragraphStyles.size23}
                            >
                                We've emailed your ticket to <span className="c-orange--700">{state.userEmail}</span> and will send updates in the run up to the event.
                            </Paragraph>
                        </Container>

                        <Container
                            containerStyle={containerStyles.maxWidth600}
                            style={{ marginTop: "110px" }}
                        >
                            <Ticket />
                        </Container>
                    </>
                )}
            </main>
        </>
    );
}