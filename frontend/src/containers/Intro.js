import React, {useState} from 'react'
import BGimg from '../images/나무.png'
import '../style/MainPage.scss';
import TypeIt from "typeit-react";

const Intro = () => {
    const SuperStrong = ({ children }) => {
        return <strong style={{ fontSize: "80px" }}>{children}</strong>;
      };

      const [buttonText, setButtonText] = useState("Freeze");
      const [instance, setInstance] = useState(null);
    
      const toggleFreeze = () => {
        if (instance.is("frozen")) {
          instance.unfreeze();
          setButtonText("Freeze");
          return;
        }
    
        instance.freeze();
        setButtonText("Unfreeze");
    };
    return (
        <div className="intro">
            <img src={BGimg} width="100%" height="100%" />
            <div className="blah_blah">
                <div className="Welcome">
                <TypeIt
                    
                    getBeforeInit={(instance) => {
                        instance.type("Welecom to 89NAMU").pause(750);
                        
                        // Remember to return it!
                        return instance;
                    }}
                    />
                </div>
                <div className="Welcome2">
                <TypeIt
                    options={{ loop: true }}
                    getAfterInit={(instance) => {
                        setInstance(instance);
                        return instance;
                    }}
                >
                    지구를 위한 현명한 소비 <br/>
                    89NAMU와 함께 시작하세요
                    </TypeIt>
                 
                </div>

            </div>
        </div>
    )
}

export default Intro
