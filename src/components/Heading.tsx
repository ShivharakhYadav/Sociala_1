import { Typography } from '@mui/material';
type HeadingType = {
    text: string;
    variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const Heading = ({ text, variant }: HeadingType) => {
    return <Typography variant={variant}>{text}</Typography>
}
export default Heading;