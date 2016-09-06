
//message of return area
var message = {
	'send'        : '<div class="alert alert-info"><b>Success!</b>请求已发送!请稍候片刻以供服务器进行运算</div>',
	'ret404'      : '<div class="alert alert-danger"><b>Error!</b>请求发送失败!请重试或放弃操作</div>',
	'TLE'         : '<div class="alert alert-danger"><b>Error!</b>TLE_error:运算时间过长(>15s),自动终止.请调整参数或减少计算规模</div>',
	'toomuch'     : '<div class="alert alert-warning"><b>Error!</b>需要的攻击机过多,请提高制空值，或减少需要考虑的攻击机数量</div>',
	'unreachable' : '<div class="alert alert-warning"><b>Error!</b>制空值在当前条件下无法达到</div>',
	'intererror'  : '<div class="alert alert-danger"><b>Error!</b>查询内部错误,可能因为运算时间过长或结果溢出?请反馈</div>',
	
	'success'     : ''//'<div class="alert alert-success"><b>Success!</b>返回结果已接收!</div>'
};

