// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Holomi.sol";
import "./TreeFactory.sol";

contract PalguNamu {
    address payable account = payable(0xdD870fA1b7C4700F2BD7f44238821C26f7392148);
    address private treefactoryAddress;
    address private holomiAddress;
    address private owner;
    
    // 예치 시작
    mapping(address => uint) public depositStart;

    // Ether balance mapping
    mapping(address => uint) public etherBalanceOf;

    // 예치 bool
    mapping(address => bool) public isDeposited;

    // * 예치 기간 mapping (1분, 3분, 5분);
    mapping(address => uint) public depositMinutes;
    
    // * 예치 총 시간
    mapping(address => uint) public totalPeriod;


    
    event Buying(address indexed buyer, string productName, uint amount);
   
    event Deposit(address indexed user, uint etherAmount, uint timeStart, uint depositPeriod);
    event Withdraw(address indexed user, uint etherAmount, uint fee, uint interest);
    event BuyToken(address indexed user, uint etherAmount, uint buyTime, uint tokenAmount);
    event CancellationDeposit(address indexed user, uint etherAmount, uint cancelStart);
    
    event SwapHTR(uint256 indexed tokenId, address buyer);

    
    constructor(address _holomiaddress,address _treeFactory){
        owner = msg.sender;
        holomiAddress = address(_holomiaddress);
        treefactoryAddress = address(_treeFactory);
    }

    // 이더 받을 계좌 설정
    function setAccount(address _account) public{
        require(msg.sender == owner, "[ ERROR ] Permission Denied : only owner can change pass minter role");
        account = payable(_account);
    }
    
    // holomi treefactory approve 
    function setApproveToken(address _setAddress) public{
        require(msg.sender == owner, "[ ERROR ] Permission Denied : only owner can change pass minter role");
        Holomi _holomi = Holomi(holomiAddress);
        TreeFactory _treeFactory = TreeFactory(treefactoryAddress);
        _holomi.passMinterRole(msg.sender, _setAddress);
        _holomi.setApproveAddress(_setAddress);
        _treeFactory.passMinterRole(msg.sender, _setAddress);
        _treeFactory.setApproveAddress(_setAddress);
    }

    function buying(string memory _productName, uint _amount) payable public {
        // msg.value :: 계약에 메시지와 함께 보낸 wei의 양(wei는 ETH의 단위)
        require(msg.value >= 1e16, "[ ERROR ] must be over 0.01 ETH");
        Holomi _holomi = Holomi(holomiAddress);
        _holomi.mint(msg.sender, msg.value*10); // 구매후 토큰 마일리지 반환 (1대 10비율)
        account.transfer(msg.value);

        emit Buying(msg.sender, _productName, _amount);
    }

    function deposit(uint _minutes) payable public {
        require(isDeposited[msg.sender] == false, 'Error, deposit already active');
        require(msg.value>=1e16, 'Error, deposit must be >= 0.01 ETH');
        etherBalanceOf[msg.sender] = etherBalanceOf[msg.sender] + msg.value;
        depositStart[msg.sender] = depositStart[msg.sender] + block.timestamp;

        // * 선택한 예치 기간을 가져와서 현재 시간과 예치 기간을 합하여 mapping에 저장
        uint periodSecond = _minutes * 60;
        uint totalDeposit = block.timestamp + periodSecond;
        depositMinutes[msg.sender] = _minutes;
        totalPeriod[msg.sender] = totalDeposit;


        isDeposited[msg.sender] = true; //activate deposit status
        
        emit Deposit(msg.sender, msg.value, block.timestamp, totalDeposit);
    }

    function withdraw() public {
        
        require(isDeposited[msg.sender]==true, 'Error, no previous deposit');
        // * require를 이용하여 예치할 수 있는 기간인지 확인하여 withdraw를 할 수 있는지 예치 기간이 아니면 Error
        require(block.timestamp - depositStart[msg.sender] >=  depositMinutes[msg.sender] * 60 , "Error, Please wait a little longer.");

        uint fee;
        if(depositMinutes[msg.sender] == 1){
        fee = 10;
        }else if(depositMinutes[msg.sender] == 3){
        fee = 30;
        }else{
        fee = 50;
        }
        uint interest = fee * etherBalanceOf[msg.sender] * ((block.timestamp - depositStart[msg.sender])/60);

        uint userBalance = etherBalanceOf[msg.sender]; //for event

        //send funds to user
        payable(msg.sender).transfer(etherBalanceOf[msg.sender]); //eth back to user
        Holomi _holomi = Holomi(holomiAddress);
        _holomi.mint(msg.sender, interest); //interest to user

        //reset depositer data
        depositStart[msg.sender] = 0;
        etherBalanceOf[msg.sender] = 0;
        isDeposited[msg.sender] = false;
        depositMinutes[msg.sender] = 0;
        totalPeriod[msg.sender] = 0;

        emit Withdraw(msg.sender, userBalance, fee, interest);
    }

    // 1ETH 100개
    function buyToken() payable public {
        require(msg.value>=1e16, 'Error, deposit must be >= 0.01 ETH');
        Holomi _holomi = Holomi(holomiAddress);
        _holomi.mint(msg.sender, msg.value*100);
        // transfer 넣기
        account.transfer(msg.value);
        
        emit BuyToken(msg.sender, msg.value, block.timestamp, msg.value*100);
    }

  // Deposit 취소
    function cancellationDeposit() public{

        require(isDeposited[msg.sender] == true, 'Error, It is disabled.');

        payable(msg.sender).transfer(etherBalanceOf[msg.sender]); //eth back to user

        depositStart[msg.sender] = 0;
        etherBalanceOf[msg.sender] = 0;
        isDeposited[msg.sender] = false;
        depositMinutes[msg.sender] = 0;
        totalPeriod[msg.sender] = 0;

        emit CancellationDeposit(msg.sender,etherBalanceOf[msg.sender], block.timestamp);
    }
    
    function balanceOfHolomi(address _account)view public returns(uint256){
        Holomi _holomi = Holomi(holomiAddress);
        return _holomi.balanceOf(_account);
    }
    
    function swap(uint _holomiAmount, uint256 _tokenId) public{
        require(_holomiAmount == 200 , "[ ERROR ] Holomi must be 200 HLM");
        _transferHolo(_holomiAmount * 10 ** 18);
        _transferHTR(_tokenId, msg.sender);
        emit SwapHTR( _tokenId, msg.sender);
    }
    
    function getHTR(uint _tokenId) public view returns(uint256, address[] memory, uint256, uint256, uint256, string memory, bool){
        TreeFactory _treeFactory = TreeFactory(treefactoryAddress);
        return _treeFactory.getHTR(_tokenId);
    }
    
    function _transferHolo(uint _amount) private {
        Holomi _holomi = Holomi(holomiAddress);
        _holomi.transferHolomi(msg.sender ,account, _amount);
    }
    
    function _transferHTR(uint256 tokenId_, address to_) private {
        TreeFactory _treeFactory = TreeFactory(treefactoryAddress);
        _treeFactory.transferHTR(tokenId_,to_);
    }
}