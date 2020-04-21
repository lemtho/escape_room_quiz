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
            },

            incIndex: function(index, options){
                return parseInt(index) + 1; 
            },

            showChoices: function(type, options){
                if(type == 'MC' || type == 'TF'){
                    return options.fn(this);
                }
            },

            showMCChoices: function(type, options){
                if(type == 'MC'){
                    return options.fn(this);
                }
            }
        }
    });
}

module.exports = hbsHelpers; 