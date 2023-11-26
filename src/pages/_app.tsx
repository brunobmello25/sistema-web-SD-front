import { type AppType } from "next/dist/shared/lib/utils";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppProvider } from "~/context/app-context";
import { ModalProvider } from "~/context/modal-context";

import "~/styles/globals.css";

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </AppProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
