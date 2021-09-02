import React, { useEffect, useRef } from "react";
import treeIcon from "../images/treeicon.png";
import "../style/maketree.scss";
import { AiOutlineFileImage } from "react-icons/ai";
import { FaSearchLocation } from "react-icons/fa";



function MakeTree({ CaptureFile, onSubmit, treefactoryinit, changeX, changeY, changeAmount, imgLoading, imgBuffer, imgString }) {
    const container = useRef(null);
    const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
    };

    const imgSource = treeIcon,
        imgSize = new window.kakao.maps.Size(50, 70),
        imgOption = { offset: new window.kakao.maps.Point(27, 69) };

    var markerImage = new window.kakao.maps.MarkerImage(imgSource, imgSize, imgOption),
        markerPosition;// 마커가 표시될 위치입니다
    //const map =  new window.kakao.maps.Map(container.current, options);
    var marker;
    //장소 검색 생성 객체 ps
    const ps = new window.kakao.maps.services.Places();
    useEffect(async () => {
        new window.kakao.maps.Map(container.current, options);
    }, []);
    // 키워드 검색 완료 시 호출되는 콜백함수
    function placesSearchCB(data, status, pagination) {
        if (status === window.kakao.maps.services.Status.OK) {

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가
            let bounds = new window.kakao.maps.LatLngBounds();

            for (let i = 0; i < data.length; i++) {
                //displayMarker(data[i]);    
                bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
            }
            var map = new window.kakao.maps.Map(container.current, options);
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정
            map.setBounds(bounds);
            window.kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
                // 클릭한 위도, 경도 정보를 가져옵니다 
                var latlng = mouseEvent.latLng;
                changeX(latlng.getLat());
                changeY(latlng.getLng());
                markerPosition = new window.kakao.maps.LatLng(latlng.getLat(), latlng.getLng());
                // 마커가 지도 위에 표시되도록 설정합니다
                marker = new window.kakao.maps.Marker({
                    position: markerPosition,
                    image: markerImage // 마커이미지 설정 
                });
                marker.setMap(map);
                window.kakao.maps.event.addListener(marker, 'click', function () {
                    marker.setMap(null);
                });

                var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
                message += '경도는 ' + latlng.getLng() + ' 입니다';
                console.log(message);
            });
        }
    }
    const onSubmitAddress = (e) => {
        e.preventDefault();
        ps.keywordSearch(e.target.place.value, placesSearchCB);
    }

    return (
        <div className="makeTreeContainer">
            {/* <div className="treebox">MakeTree</div> */}
            <div className="imgContainer">
                <div className="addressBox"
                    style={{
                        width: "500px",
                        height: "500px",
                        borderRadius: "15px",
                        border: "solid green 3px",
                        // margin: "auto"
                    }}
                    ref={container}>
                </div>

                <div className="imgBox">
                    {imgString == null ?
                        (<div >
                            <p>이미지를 올려주세용</p>
                        </div>) :
                        (<div className="treeImg">
                            <img  src={imgString} />
                        </div>)
                    }
                </div>
            </div>
            <div className="formContainer">
                <form className="addressContainer" onSubmit={onSubmitAddress}>
                    <div className="address-div">
                        <input className="addressInput" type="text" placeholder="주소 검색" name="place" />
                        <button type="submit">
                            <FaSearchLocation/>
                        </button>
                    </div>
                </form>

                <form className="infoContainer" onSubmit={onSubmit}>

                    <div className="label-input">
                        <label className="label-upload" for="upload">
                                <AiOutlineFileImage className="icon"/><span>이미지 업로드</span>
                        </label>
                        <input style={{display:"hidden"}} className="img-upload" id="upload" name="img" type="file" accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={CaptureFile} value={treefactoryinit.img} />
                    </div>
                    <div className = "input-map">
                        <label htmlFor="x">위도: </label>
                        <input  name="x" id="x" type="number" placeholder="X축" readOnly value={treefactoryinit.x} onChange={changeX} />
                    </div>
                    <div>
                        <label htmlFor="y">경도: </label>
                        <input name="y" id="y" type="number" placeholder="Y축" readOnly value={treefactoryinit.y} onChange={changeY} />
                    </div>
                    <div >
                        <label htmlFor="amount">개수: </label>
                        <input name="amount" id="amount" type="number" placeholder="개수" value={treefactoryinit.amount} onChange={changeAmount} />
                    </div>
                    <button type="submit">MAKE</button>
                </form>
            </div>
        </div>
    );
}


export default MakeTree;