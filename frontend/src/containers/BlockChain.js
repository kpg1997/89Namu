import React, { useEffect } from 'react'
import '../style/base.scss';
import '../style/demo1.scss';
import ScriptTag from 'react-script-tag';
import {Helmet} from 'react-helmet';
import useScript from '../hook/useScript';
import '../style/MainPage.scss';
const BlockChain = () => {


    useEffect (()=>{
        const a = document.createElement('script');
        const b = document.createElement('script');
        const c = document.createElement('div');
        
        a.type = 'x-shader/x-vertex';
        b.type = 'x-shader/x-fragment';
        
        a.id = "wrapVertexShader";
        b.id = "wrapFragmentShader";
        

        b.text = "varying vec3 vColor;uniform sampler2D texture;void main(){vec4 textureColor = texture2D( texture, gl_PointCoord );if ( textureColor.a < 0.3 ) discard;vec4 color = vec4(vColor.xyz, 1.0) * textureColor;gl_FragColor = color;}"
        a.text = "attribute float size;attribute vec3 color;varying vec3 vColor;void main() {vColor = color;vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );gl_PointSize = size * ( 350.0 / - mvPosition.z );gl_Position = projectionMatrix * mvPosition;}"
        // this.instance.appendChild(a);
        // this.instance.appendChild(b);
        const Div = document.getElementById("COVID-19");
        
        Div.append(a);
        Div.append(b);
    },[]);

//  useScript('http://localhost:3000/js/three.min.js');
//  useScript('http://localhost:3000/js/TweenMax.min.js');

     useScript('http://132.226.231.97:3000/js/demo1.js');

     return (

        <div className="content" id="COVID-19" >
	<canvas className="scene scene--full" id="scene"></canvas>
        <div className="content__inner">
            <h2 className="content__title">89 NAMU</h2>
            <h3 className="content__subtitle">BLOCK CHAIN DAPP</h3>
        </div>
    </div>
    
    )
}

export default BlockChain
