import { TabList, Tabs, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import SignUp from "./SignUp";
import Login from "./Login";

const LoginSignUpTabs = () => {
  return (
    <Tabs variant="enclosed">
      <TabList>
        <Tab>Login</Tab>
        <Tab>Sign Up</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Login />
        </TabPanel>
        <TabPanel>
          <SignUp />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default LoginSignUpTabs;
