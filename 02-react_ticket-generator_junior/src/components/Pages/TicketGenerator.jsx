import HeadingWithIcon, { iconStyles } from "../UI/HeadingWithIcon/HeadingWithIcon";
import Heading from "../UI/Heading/Heading";

export default function TicketGenerator() {
    return (
        <>
            <header>
                <HeadingWithIcon>
                    {/* fill="#F57463" */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                        <path d="M0 26.864A8.898 8.898 0 0 0 0 9.069v6.229a2.67 2.67 0 0 1 0 5.339v6.229Z" />
                        <path d="M29.661 12.034a15.935 15.935 0 0 0-4.82-.742c-8.805 0-15.943 7.138-15.943 15.943 0 .884.072 1.751.21 2.596h9.907a6.377 6.377 0 0 1 10.647-6.771V12.034ZM1.564.17c.738 6.673 6.396 11.864 13.267 11.864 6.87 0 12.528-5.191 13.266-11.865H18.55a4.006 4.006 0 0 1-7.441 0H1.564Z" />
                    </svg>
                    <Heading>Coding Conf</Heading>
                </HeadingWithIcon>
            </header>
        </>
    );
}