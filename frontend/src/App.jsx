import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";

// CREATE SELLING FUNCTIONALITY
//    mark a book as sold and display in 'sold books' section
//    implement multiple stock option (state changes on basis of books sold)
// IMPLEMENT ADMIN PASS FUNCTIONALITY (for adding, removing or selling book)

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")} p={2}>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
