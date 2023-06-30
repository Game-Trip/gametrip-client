import { css } from "@emotion/css";
import { motion, useIsPresent } from "framer-motion";
import { TopNavBar } from "../../components/TopNavBar/TopNavBar";

export default function LocationForm(): JSX.Element {
  const isPresent = useIsPresent();

  return (
    <div className={styles.wrapper}>
      <TopNavBar showLoginButton={false} showHomeButton={true} />
FORM
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 0.5, ease: "circOut" } }}
        exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="privacy-screen"
      />
    </div>
  );
}

const styles = {
  wrapper: css`
    height: 100vh;
    display: flex;
    flex-direction: column;
  `,
};
