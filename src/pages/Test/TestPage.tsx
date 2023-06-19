import { css } from "@emotion/css";
import { TopNavBar } from "../../components/TopNavBar/TopNavBar";
import LogoutButton from "../../components/LogOutBoutton/LogOutButton";
interface Props {
  isLogged: boolean;
}

export default function Component({ isLogged }: Props): JSX.Element {


  return (
    <div className={styles.wrapper}>
      <TopNavBar showLoginButton={false} showHomeButton={false} />
      <div id="body" className={styles.body}>
        <LogoutButton />
      </div>
    </div>
  );
}

const styles = {
  wrapper: css`
    height: 100vh;
    display: flex;
    flex-direction: column;
  `,
  body: css`
    background-color: #5ab584;
    width: 100%;
    flex-grow: 1;
    display: flex;
    // rows
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 120px;
  `,
};
