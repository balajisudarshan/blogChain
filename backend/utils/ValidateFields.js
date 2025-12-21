const ValidateFields = (fields)=>{
    for(const [key,value] of Object.entries(fields)){
        if(!value){
            throw new Error(`${key} is required`)
        }
    }
}
module.exports = ValidateFields