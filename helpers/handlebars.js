function hbsHelpers(handlebars){
    return handlebars.create({
        helpers: {
            showResult: function(num_taken, options){
                if(num_taken > 0){
                    return options.fn(this);
                }

            },

            editdel: function(num_taken, options){
                if(num_taken == 0){
                    return options.fn(this);
                }
            }
            
        }
    });
}

module.exports = hbsHelpers; 