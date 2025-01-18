import { CircularProgress, Container } from '@mui/material';


// eslint-disable-next-line react/prop-types
const Loading = ({loading, error}) => {
  
    if (loading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }
    if (error) {
        return <div>{error}</div>;
    }

    return null

}

export default Loading