import { useEffect, useState } from "react";

export function LoaderScreen() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = window.setTimeout(() => setVisible(false), 5000);
        return () => window.clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <>
            <style>{`
        .loader-screen {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: grid;
          place-items: center;
          background: #f7f3ef;
        }

        .loader-shell {
          position: relative;
          width: 90px;
          height: 110px;
        }

        .loader-bar {
          position: absolute;
          bottom: 0;
          width: 10px;
          height: 50%;
          background: #111111;
          transform-origin: center bottom;
          box-shadow: 1px 1px 0 rgba(17, 17, 17, 0.15);
        }

        .loader-bar:nth-child(1) { left: 0px; transform: scale(1, 0.2); animation: barUp1 5s infinite; }
        .loader-bar:nth-child(2) { left: 15px; transform: scale(1, 0.4); animation: barUp2 5s infinite; }
        .loader-bar:nth-child(3) { left: 30px; transform: scale(1, 0.6); animation: barUp3 5s infinite; }
        .loader-bar:nth-child(4) { left: 45px; transform: scale(1, 0.8); animation: barUp4 5s infinite; }
        .loader-bar:nth-child(5) { left: 60px; transform: scale(1, 1); animation: barUp5 5s infinite; }

        .loader-ball {
          position: absolute;
          bottom: 10px;
          left: 0;
          width: 10px;
          height: 10px;
          background: #f4a6c1;
          border-radius: 50%;
          animation: ball624 5s infinite;
        }

        @keyframes ball624 {
          0% { transform: translate(0, 0); }
          5% { transform: translate(8px, -14px); }
          10% { transform: translate(15px, -10px); }
          17% { transform: translate(23px, -24px); }
          20% { transform: translate(30px, -20px); }
          27% { transform: translate(38px, -34px); }
          30% { transform: translate(45px, -30px); }
          37% { transform: translate(53px, -44px); }
          40% { transform: translate(60px, -40px); }
          50% { transform: translate(60px, 0); }
          57% { transform: translate(53px, -14px); }
          60% { transform: translate(45px, -10px); }
          67% { transform: translate(37px, -24px); }
          70% { transform: translate(30px, -20px); }
          77% { transform: translate(22px, -34px); }
          80% { transform: translate(15px, -30px); }
          87% { transform: translate(7px, -44px); }
          90% { transform: translate(0, -40px); }
          100% { transform: translate(0, 0); }
        }

        @keyframes barUp1 {
          0%, 40% { transform: scale(1, 0.2); }
          50%, 90% { transform: scale(1, 1); }
          100% { transform: scale(1, 0.2); }
        }

        @keyframes barUp2 {
          0%, 40% { transform: scale(1, 0.4); }
          50%, 90% { transform: scale(1, 0.8); }
          100% { transform: scale(1, 0.4); }
        }

        @keyframes barUp3 {
          0%, 100% { transform: scale(1, 0.6); }
        }

        @keyframes barUp4 {
          0%, 40% { transform: scale(1, 0.8); }
          50%, 90% { transform: scale(1, 0.4); }
          100% { transform: scale(1, 0.8); }
        }

        @keyframes barUp5 {
          0%, 40% { transform: scale(1, 1); }
          50%, 90% { transform: scale(1, 0.2); }
          100% { transform: scale(1, 1); }
        }
      `}</style>

            <div className="loader-screen" aria-live="polite" aria-label="Loading home page">
                <div className="loader-shell" aria-hidden="true">
                    <div className="loader-bar" />
                    <div className="loader-bar" />
                    <div className="loader-bar" />
                    <div className="loader-bar" />
                    <div className="loader-bar" />
                    <div className="loader-ball" />
                </div>
            </div>
        </>
    );
}

export default LoaderScreen;
