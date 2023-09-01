import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Button, Container, Stack, TextField } from '@mui/material'

export default function SearchPage() {
    let navigate = useNavigate() 

    const [query,setQuery] = useState(useParams().queryText)

    const handleSubmit = event => {
        event.preventDefault()
        navigate(`/search/${query}`)
    }

    return(
        <Container className="search_page" maxWidth="md" sx={{textAlign: 'center'}}>
            <h1>Flickr Search</h1>
            <form onSubmit={handleSubmit}>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0}
                >
                    <TextField 
                        label="Search"
                        size="small"
                        value={query}
                        onChange={event => setQuery(event.target.value)}
                    />
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleSubmit}
                    >Search</Button>
                </Stack>
            </form>
            <Outlet />
        </Container>
    )

}