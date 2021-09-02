import React, { useEffect, useRef } from "react";
import { FiMapPin } from "react-icons/fi"
import treeIcon from "../images/treeicon.png";
import "../style/mypage.scss";
const { kakao } = window;

function MyPage(props) {
    const { getProdData, getTreeData, getStakingData } = props;
    const ref = useRef(null);

    const mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
    };

    const positions = [];
    for(let i = 0; i < getTreeData.length; i++) {
        positions.push({content: `${getTreeData[i].htr_id}`, latlng: new kakao.maps.LatLng(getTreeData[i].htr_x, getTreeData[i].htr_y)});
    }

    let map;

    useEffect(() => {
        map = new kakao.maps.Map(ref.current, mapOption);
        marking();
    }, [getTreeData]);

    const showTreeMarker = (lat, lng) => {
        const pos = new kakao.maps.LatLng(lat, lng);
        map.setCenter(pos);
    }

    const imgSource = treeIcon;
    const imgSize = new kakao.maps.Size(50, 70);
    const imgOption = { offset: new kakao.maps.Point(27, 69) };
    let markerImage = new kakao.maps.MarkerImage(imgSource, imgSize, imgOption);

    function marking() {
        for(let i = 0; i < positions.length; i++) {
            // create marker
            const marker = new kakao.maps.Marker({
                map: map,
                position: positions[i].latlng,
                image: markerImage
            });
    
            // create info window
            const infoWindow = new kakao.maps.InfoWindow({
                content: `Tree Id is "${positions[i].content}"`
            });
    
            // mouseover, mouseout event
            kakao.maps.event.addListener(marker, 'mouseover', function () {
                infoWindow.open(map, marker);
            });
            kakao.maps.event.addListener(marker, 'mouseout', function () {
                infoWindow.close();
            });
    
            marker.setMap(map);
        }
    }

    return (
        <div className="mypageBox">
            <h1>My Transaction History</h1>
            <div className="myProdList">
                <h3>Purchased Product List</h3>
                <table>
                    <thead>
                        <tr>
                            <td>Product</td>
                            <td>Price</td>
                        </tr>
                    </thead>
                    <tbody>
                        {getProdData.map((prod) => (
                            <tr>
                                <td>{prod.name}</td>
                                <td>{prod.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="stakingLog">
                <h3>Staking Log</h3>
                <table>
                    <thead>
                        <tr>
                            <td>StartTime</td>
                            <td>FinishTime</td>
                            <td>Ether</td>
                            <td>Rate</td>
                            <td>Holomi</td>
                            <td>State</td>
                        </tr>
                    </thead>
                    <tbody>
                        {getStakingData.map((staking) => (
                            <tr>
                                <td>{staking.startTime}</td>
                                <td>{staking.endTime}</td>
                                <td>{staking.ether}</td>
                                <td>{staking.rate * 10}x</td>
                                <td>{staking.holomi}</td>
                                <td>{staking.state}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="myTreeList">
                <h3>Purchased Tree List</h3>
                <table>
                    <thead>
                        <tr>
                            <td>Tree Id</td>
                            <td>Creation Time</td>
                            <td>Click me!</td>
                        </tr>
                    </thead>
                    <tbody>
                        {getTreeData.map((tree) => (
                            <tr>
                                <td>{tree.htr_id}</td>
                                <td>{tree.htr_time}</td>
                                <button type="button" className="showTree" onClick={() => {showTreeMarker(tree.htr_x, tree.htr_y)}}><FiMapPin size="25" color="#5c940d"/></button>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="myTreeMap">
                <h3>My Tree Map</h3>
                <div className="map"style={{width:"100%", height:"480px"}} ref={ref}></div>
            </div>
        </div>
    );
}

export default MyPage;
