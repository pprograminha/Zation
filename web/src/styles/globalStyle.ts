import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        border: 0;
        appearance: none;
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    html, body, #root {
        height: 100vh;
        min-width: 260px;
        overflow-x: hidden;
    }
    #root{
        overflow: auto;
    }
     a {
         text-decoration:none;
         color: #ddd;
     }
    ul {
        list-style:none;
    }
    input {
        margin: 0 2px;

        padding: 5px 10px;
        max-width: 500px;
        width: 100%;

        background-color: #ddd;
    }
    button {
        padding: 5px 10px;
        cursor: pointer;
    }
    *::-webkit-scrollbar{
        background-color: #26273b;
        width: 16px;
        height: 16px;

    }
    *::-webkit-scrollbar-thumb{
        border-right: 2px solid #26273b;
        border-left: 2px solid #26273b;
        border-radius: 50rem;
        background-color: #2b2d42;

    }
    * {
        scrollbar-color: #26273b #2b2d42;
        scrollbar-width: thin;
    }


`;
