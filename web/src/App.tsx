import AppProvider from './contexts';
import Routes from './routes';
import GlobalStyle from './styles/globalStyle';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <AppProvider>
        <Routes />
      </AppProvider>
    </>
  );
};

export default App;
