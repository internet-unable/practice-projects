import Header from "../Sections/Header/Header";
import Heading from "../UI/Heading/Heading";
import Upload from "../UI/Form/Upload/Upload";
import Input from "../UI/Form/Input/Input";
import Button from "../UI/Button/Button";

export default function TicketGenerator() {
    return (
        <>
            <Header />

            <main style={{ paddingTop: "60px" }}>
                <section className="text--center" style={{ marginBottom: "51px" }}>
                    <Heading tag="h1" className="margin--center test" style={{ maxWidth: "800px" }}>Your Journey to Coding Conf 2025 Starts Here!</Heading>
                    <p>Secure your spot at next year`s biggest coding conference.</p>
                </section>

                <section>
                    <form className="margin--center" style={{ maxWidth: "460px" }}>
                        <Upload
                            className="form-elem"
                            label="Upload Avatar"
                            name="avatar"
                            message="Upload your photo (JPG or PNG, max size: 500KB)."
                        />

                        <Input
                            className="form-elem"
                            label="Full Name"
                            type="text"
                            name="full-name"
                        />

                        <Input
                            className="form-elem"
                            label="Email Address"
                            type="email"
                            name="email"
                            placeholder="example@email.com"
                            message="Please enter a valid email address."
                        />

                        <Input
                            className="form-elem"
                            label="GitHub Username"
                            type="text"
                            name="github-username"
                            placeholder="@yourusername"
                        />

                        <Button
                            className="form-elem"
                            style={{ marginTop: "24px" }}
                        >
                            Generate My Ticket
                        </Button>
                    </form>
                </section>
            </main>
        </>
    );
}