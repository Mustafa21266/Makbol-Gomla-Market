class APIFeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    search() {
        if(this.queryString.keyword === 'all'){
            return this;
        }else {
            const keyword = this.queryString.keyword ? {
                name: {
                    $regex: this.queryString.keyword,
                    $options: 'i'
                }
            } : {};
            // console.log(keyword);
            this.query = this.query.find({...keyword});
            return this;
        }
        
    }
    filter(){
        const queryCopy = {...this.queryString};
        // console.log(queryCopy.category)
        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach(el => delete queryCopy[el]);
        // console.log(queryCopy)
        //ADVANCED FILTER
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,match => `$${match}`)
        // console.log(queryStr)

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    pagination(resultsPerPage){
        console.log(this.queryString.page)
        const currentPage = Number(this.queryString.page) || 1;
        const skip = resultsPerPage * (currentPage-1);
        this.query = this.query.limit(resultsPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures;