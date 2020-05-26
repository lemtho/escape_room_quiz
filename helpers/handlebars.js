function hbsHelpers(handlebars){
    return handlebars.create({
        helpers: {
            // Calculate quiz code for students to enter game if quiz is published
            // Helpers referenced: https://handlebarsjs.com/guide/block-helpers.html#simple-iterators
            calcCode: function(published, id, options)
            {
                if(published == 'Y')
                {
                    return parseInt(id) * 273 + 89; 
                }
                else
                {
                    return "";
                }
            },

            // Display result button if quiz is published
            showResult: function(published, options)
            {
                if(published == 'Y')
                {
                    return options.fn(this);
                }
            },

            // Display edit delete if students have taken it
            editdel: function(published, options)
            {
                if(published == 'N')
                {
                    return options.fn(this);
                }
            },
            
            //Increment question number, referenced: https://stackoverflow.com/questions/22103989/adding-offset-to-index-when-looping-through-items-in-handlebars
            //Also saves index value into variable, referenced: https://stackoverflow.com/questions/24736938/is-it-possible-to-assign-a-parameter-value-within-handlebars-templates-without-u/37152268
            inc: function(index, variable, options)
            {
                if(index == undefined)
                {
                    index = 0; 
                }
                options.data.root[variable] = parseInt(index) + 2;

                return parseInt(index) + 1; 
            },

            // Display when type is either multiple choice or T/F
            showChoices: function(type, options)
            {
                if(type == 'MC' || type == 'TF')
                {
                    return options.fn(this);
                }
            },

            // Display when type is multiple choice
            showMCChoices: function(type, options)
            {
                if(type == 'MC')
                {
                    return options.fn(this);
                }
            }
        }
    });
}

module.exports = hbsHelpers; 