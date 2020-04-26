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
            
            //Increment question number, referenced: https://stackoverflow.com/questions/22103989/adding-offset-to-index-when-looping-through-items-in-handlebars
            inc: function(index, options){
                if(index == undefined)
                {
                    index = 0; 
                }

                return parseInt(index) + 1; 
            },

            new: function(index, options)
            {
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