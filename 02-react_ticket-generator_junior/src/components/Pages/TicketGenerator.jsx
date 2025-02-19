import Header from "../Sections/Header/Header";
import Heading from "../UI/Heading/Heading";

import Input from "../UI/Form/Input/Input";
import Button from "../UI/Button/Button";

export default function TicketGenerator() {
    return (
        <>
            <Header />

            <main className="text--center" style={{ paddingTop: "60px" }}>
                <section style={{ marginBottom: "50px" }}>
                    <Heading tag="h1" className="margin--center test" style={{ maxWidth: "800px" }}>Your Journey to Coding Conf 2025 Starts Here!</Heading>
                    <p>Secure your spot at next year`s biggest coding conference.</p>
                </section>

                <section>
                    <form>
                        <div>
                            <label htmlFor="avatar">Upload avatar</label>
                            <input type="file" id="avatar" />
                        </div>

                        <Input label="Full name" type="text" name="full-name" />
                        <Input label="Email address" type="email" name="email" placeholder="example@email.com" />
                        <Input label="Github Username" type="text" name="github-username" placeholder="@yourusername" />
                        
                        <Button>Generate My Ticket</Button>
                    </form>
                </section>
            </main>
        </>
    );
}