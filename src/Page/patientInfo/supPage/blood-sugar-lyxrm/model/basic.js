import Model from "js-model";

let Basic = new Model({
    "id": 0,
    "source": {
        type: Date,
        format: 'l'  // 使用manba日期格式化, "l": "YYYY-MM-DD",
    },
    "description": "",
    "tags": [ 0 ],
    "companyId": "",
    "rate": {
    	type: Number,
    	default: 0.8
    },
    "salary": {
        type: Number,
        unit: Model.Q //金额，千为单位
    }
});
export default Basic;