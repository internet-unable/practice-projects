import Header from "../Sections/Header/Header";
import Heading from "../UI/Heading/Heading";

import Input from "../UI/Form/Input/Input";
import Button from "../UI/Button/Button";

export default function TicketGenerator() {
    return (
        <>
            <Header />

            <main style={{ paddingTop: "60px" }}>
                <section className="text--center" style={{ marginBottom: "50px" }}>
                    <Heading tag="h1" className="margin--center test" style={{ maxWidth: "800px" }}>Your Journey to Coding Conf 2025 Starts Here!</Heading>
                    <p>Secure your spot at next year`s biggest coding conference.</p>
                </section>

                <section>
                    <form className="margin--center" style={{ maxWidth: "460px" }}>
                        <div style={{ marginBottom: "24px" }}>
                            <div>
                                <label htmlFor="avatar">Upload avatar</label>
                                <input type="file" id="avatar" />
                            </div>

                            <Input label="Full Name" type="text" name="full-name" />
                            <Input
                                label="Email Address"
                                type="email"
                                name="email"
                                placeholder="example@email.com"
                                message="Please enter a valid email address."
                            />
                            <Input label="GitHub Username" type="text" name="github-username" placeholder="@yourusername" />
                        </div>

                        <Button>Generate My Ticket</Button>
                    </form>
                </section>
            </main>
        </>
    );
}