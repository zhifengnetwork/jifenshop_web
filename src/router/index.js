import Vue from 'vue'
import Router from 'vue-router'

// 登录
import Login from '@/pages/login/Login'

// 注册
import Register from '@/pages/login/Register'

// 修改密码
import EditPassword from '@/pages/login/EditPassword'

// 首页
import Home from '@/pages/home/Home'
// 搜索页面
import search from '@/pages/home/search'
//挂卖区
import Sell from '@/pages/sell/Sell'

// 分类
import Category from '@/pages/category/Category'

//商品详情
import Details from '@/pages/details/Details'

// 购物车
import Cart from '@/pages/cart/Cart'

//付款
import Payment from '@/pages/sell/Payment'

// 订单列表
import Order from '@/pages/order/Order'

// 订单详情
import OrderDetail from '@/pages/order/OrderDetail'
// 提交评价
import Evaluate from '@/pages/order/Evaluate'
// 退货
import ReturnGoods from '@/pages/order/ReturnGoods'
// 申请退款
import ReturnRequest from '@/pages/order/ReturnRequest'

// 确认订单
import ConfirmOrder from '@/pages/pay/ConfirmOrder'
// 支付订单
import Confirm_pay from '@/pages/pay/Confirm_pay'
//搜索详情
import searchdetail from '@/pages/home/searchdetail'
// 我的
import User from '@/pages/user/User'
// 个人资料
import personalData from '@/pages/user/personalData'
// 预计收益
import shouyilist from '@/pages/user/shouyilist'
// 账户余额
import theAccountBalance from '@/pages/user/theAccountBalance'
// 提现明细
import theWithdrawal from '@/pages/user/theWithdrawal'
// 账户提现
import withdrawal from '@/pages/user/withdrawal'
//提现方式
import embody from '@/pages/user/embody'
//提现方式银行卡
import bankcard from '@/pages/user/bankcard'
// 查看订单
import lookorder from '@/pages/user/lookorder'
// 我的团队
import myTeam from '@/pages/user/myTeam'
// 团队列表
import commissionlist from '@/pages/user/commissionlist'
// 积分
import jifeng from '@/pages/user/jifeng'
//积分明细
import jifengdetail from "@/pages/user/jifengdetail"
//积分明细箭头
import mingxi from "@/pages/user/mingxi"
// 账户明细
import accountdetail from "@/pages/user/accountdetail"
// 账单明细
import billingDetails from "@/pages/user/billingDetails"
//账单明细-余额
import zhangdandetail from "@/pages/user/zhangdandetail"
// 积分转账
import transfer_accounts from "@/pages/user/transfer_accounts"
// 收款信息
import receiptInformation from '@/pages/user/receiptInformation'
// 我的分享
import mySharing from '@/pages/user/mySharing'
// 支付宝账号编辑
import alipay from '@/pages/user/alipay'
// 修改用户名
import modifyUserName from '@/pages/user/modifyUserName'

// 收藏
import Collect from '@/pages/user/Collect'

// 收货地址
import Address from '@/pages/user/address/Address'
// 添加收货地址
import AddAddress from '@/pages/user/address/AddAddress'
// 修改收货地址
import EditAddress from '@/pages/user/address/EditAddress'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		/**
		 * 登录
		 */
		{
			path: '/Login',
			name: 'Login',
			component:() => import('@/pages/login/Login'),
		},
		// 注册
		{
			path: '/Register',
			name: 'Register',
			component:() => import('@/pages/login/Register'),
		},
		// 修改密码
		{
			path: '/EditPassword',
			name: 'EditPassword',
			component:() => import('@/pages/login/EditPassword'),
		},


		/**
		 * 首页
		 */
		{
			path: '/Home',
			name: 'Home',
			component:() => import('@/pages/home/Home'),//按需加载
		},
		// 搜索
		{
			path: '/Home/search',
			name: 'search',
			component:() => import('@/pages/home/search'),//按需加载
		},
		//搜索详情
		{
			path: '/Home/searchdetail',
			name: 'searchdetail',
			component:() => import('@/pages/home/searchdetail'),//按需加载
		},
		//挂卖区
		{
			path: '/Sell',
			name: 'Sell',
			component:() => import('@/pages/sell/Sell'),
		},
		//VIP
		{
			path: '/Pay/Vip',
			name: 'Vip',
			component:() => import('@/pages/home/Vip'),
		},
		/**
		 * 分类
		 */
		{
			path: '/Category',
			name: 'Category',
			component:() => import('@/pages/category/Category'),
		},

		/**
		 * 购物车
		 */
		{
			path: '/Cart',
			name: 'Cart',
			component:() => import('@/pages/cart/Cart'),
		},

		//支付
		{
			path: '/Payment',
			name: 'Payment',
			component:() => import('@/pages/sell/Payment'),
		},

		/**
		 * 商品详情页 
		 */ 
		{
			path: '/Details',
			name: 'Details',
			component:() => import('@/pages/details/Details'),
		},

		/**
		 * 
		 * 订单中心
		 */
		// 订单列表
		{
			path: '/Order',
			name: 'Order',
			component:() => import('@/pages/order/Order'),
		},
		//订单详情
		{
			path: '/Order/OrderDetail',
			name: 'OrderDetail',
			component:() => import('@/pages/order/OrderDetail'),
		},
		// 提交评价
		{
			path: '/Order/Evaluate',
			name: 'Evaluate',
			component: (resolve) => require(['@/pages/order/Evaluate'],resolve),
		},
		// 退货
		{
			path: '/Order/ReturnGoods',
			name: 'ReturnGoods',
			component: (resolve) => require(['@/pages/order/ReturnGoods'],resolve),
		},
		// 退款申请
		{
			path: '/Order/ReturnRequest',
			name: 'ReturnRequest',
			component: (resolve) => require(['@/pages/order/ReturnRequest'],resolve),
		},
		// 确认订单
		{
			path: '/Pay/ConfirmOrder',
			name: 'ConfirmOrder',
			component: (resolve) => require(['@/pages/pay/ConfirmOrder'],resolve),
		},
		// 支付订单
		{
			path: '/Pay/Confirm_pay',
			name: 'Confirm_pay',
			component: (resolve) => require(['@/pages/pay/Confirm_pay'],resolve),
		},
		/**
		 * 我的
		 */
		{
			path: '/User',
			name: 'User',
			component:() => import('@/pages/user/User'),
		},
		// 个人资料
		{
			path: '/user/personalData',
			name: 'personalData',
			component:() => import('@/pages/user/personalData'),
		},
		// 支付密码设置
		{
			path: '/user/payment',
			name: 'payment',
			component:() => import('@/pages/user/payment'),
		},
		// 修改支付密码
		{
			path: '/user/paymentEdit',
			name: 'paymentEdit',
			component:() => import('@/pages/user/paymentEdit'),
		},
		// 重置支付密码
		{
			path: '/user/paymentReset',
			name: 'paymentReset',
			component:() => import('@/pages/user/paymentReset'),
		},
		// 预计收益
		{
			path: '/user/shouyilist',
			name: 'shouyilist',
			component:() => import('@/pages/user/shouyilist'),
		},
		// 账户余额
		{
			path: '/user/theAccountBalance',
			name: 'theAccountBalance',
			component:() => import('@/pages/user/theAccountBalance'),
		},
		// 账户提现
		{
			path: '/user/withdrawal',
			name: 'withdrawal',
			component:() => import('@/pages/user/withdrawal'),
		},
		//提现方式
		{
			path: '/user/embody',
			name: 'embody',
			component:() => import('@/pages/user/embody'),
		},
		//提现方式-银行卡
		{
			path: '/user/bankcard',
			name: 'bankcard',
			component:() => import('@/pages/user/bankcard'),
		},
		//提现方式-添加银行卡
		{
			path: '/user/addBank',
			name: 'addBank',
			component:() => import('@/pages/user/addBank'),
		},
		// 提现明细
		{
			path: '/user/theWithdrawal',
			name: 'theWithdrawal',
			component:() => import('@/pages/user/theWithdrawal'),
		},
		// 账单明细
		{
			path: '/user/billingDetails',
			name: 'billingDetails',
			component:() => import('@/pages/user/billingDetails'),
		},
		// 查看订单
		{
			path: '/user/lookorder',
			name: 'lookorder',
			component:() => import('@/pages/user/lookorder'),
		},
		//余额-账单明细
		{
			path: '/user/zhangdandetail',
			name: 'zhangdandetail',
			component:() => import('@/pages/user/zhangdandetail'),
		},
		// 我的团队
		{
			path: '/user/myTeam',
			name: 'myTeam',
			component:() => import('@/pages/user/myTeam'),
		},
		// 团队列表-列表
		{
			path: '/user/myTeam/teamList',  
			name: 'teamList',
			component: () => import('@/pages/user/teamList'),
		},
		// 团队列表-查看订单
		{
			path: '/user/myTeam/commissionlist',  
			name: 'commissionlist',
			component: () => import('@/pages/user/commissionlist'),
		},
		// 收款信息
		{
			path: '/user/receiptInformation',
			name: 'receiptInformation',
			component:() => import('@/pages/user/receiptInformation'),
		},
		// 我的分享
		{
			path: '/user/mySharing',
			name: 'mySharing',
			component:() => import('@/pages/user/mySharing'),
		},
		// 绑定手机号
		{
			path: '/user/phone',
			name: 'phone',
			component:() => import('@/pages/user/phone'),
		},
		// 支付宝账号编辑
		{
			path: '/user/alipay',
			name: 'alipay',
			component:() => import('@/pages/user/alipay'),
		},
		// 修改用户名
		{
			path: '/user/modifyUserName',
			name: 'modifyUserName',
			component:() => import('@/pages/user/modifyUserName'),
		},
		// 积分
		{
			path: '/user/jifeng',
			name: 'jifeng',
			component:() => import('@/pages/user/jifeng'),
		},
		{
			path: '/user/jifengdetail',
			name: 'jifeng',
			component:() => import('@/pages/user/jifengdetail'),
		},
		{
			path: '/user/accountdetail',
			name: 'accountdetail',
			component:() => import('@/pages/user/accountdetail'),
		},
		//积分转账
		{
			path: '/user/transfer_accounts',
			name: 'transfer_accounts',
			component:() => import('@/pages/user/transfer_accounts'),
		},
		// 积分明细带箭头
		{
			path: '/user/mingxi',
			name: 'mingxi',
			component:() => import('@/pages/user/mingxi')
		},
		// 收藏
		{
			path: '/user/Collect',
			name: 'Collect',
			component:() => import('@/pages/user/Collect'),
		},
		/**
		 * 地址管理
		 */
		// 收货地址
		{
			path: '/user/Address',
			name: 'Address',
			component:() => import('@/pages/user/address/Address'),
		},
		// 添加收货地址
		{
			path: '/user/AddAddress',
			name: 'AddAddress',
			component:() => import('@/pages/user/address/AddAddress'),
		},
		// 修改收货地址
		{
			path: '/user/EditAddress',
			name: 'EditAddress',
			component:() => import('@/pages/user/address/EditAddress'),
		},
		// 地址选点
		{
			path: '/user/SelectPoint',
			name: 'SelectPoint',
			component: (resolve) => require(['@/pages/user/address/SelectPoint'],resolve),
		},
		// 重定向
		{
			path: '*',
			redirect: '/Home'
		},

	]
})
