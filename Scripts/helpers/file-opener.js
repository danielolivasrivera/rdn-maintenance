function getDocument(p_url)
{
    var TASK_INCOMPLETED_ID = 1;
    var TASK_IN_PROGRESS_ID = 2;
    var TASK_COMPLETED_ID = 3;

    var TASK_INCOMPLETED_FORMAT = '<li class="task-waiting">';
    var TASK_IN_PROGRESS_FORMAT = '<li class="task-in-progress">';    
    var TASK_COMPLETED_FORMAT   = '<li class="task-completed" >';
    var ICON_CHECKED = '<span class="glyphicon glyphicon-ok task-completed"></span>'; 
    var ICON_GEAR = '<span class="fa fa-cog fa-spin fa-3x fa-fw" aria-hidden="true"></span>'; 

    $.ajax ({
        type: "GET",
        url: p_url,
        dataType: "xml",
        success: function(p_xml)
        {
            var output = '<ul>';
            $(p_xml).find('migration').each(function()
            {
                var stepDescription = $(this).find('description').text();
                var stepStatusID = $(this).find('statusID').text();

                switch(parseInt(stepStatusID)) {
                    case TASK_INCOMPLETED_ID:
                        output += TASK_INCOMPLETED_FORMAT + stepDescription + '</li>';
                        break;
                    case TASK_IN_PROGRESS_ID:
                        output += TASK_IN_PROGRESS_FORMAT + stepDescription + ICON_GEAR+'</li>';
                        break;
                    case TASK_COMPLETED_ID:
                        output += TASK_COMPLETED_FORMAT + ICON_CHECKED + stepDescription + '</li>';
                        break;
                    default:
                }
            });

            output += '<ul>';
            $('#migration-statuses').html(output);

            //Notes 
            var notesOutput='<p>';
            $(p_xml).find('note').each(function()
            {
                var notes = $(this).find('content').text();

                notesOutput += notes + '<br />' + '<br />';

            });
            
            notesOutput += '</p>'

            $('#maintenance-notes').html(notesOutput);
        },
        error: function(p_xhr, p_status, p_errorThrown)
        {
            var output = "<strong>Error Found: </strong>" + p_status + "<br>" + p_errorThrown.message;
            if ( $( "#errors" ).is( ":hidden" ) ) 
            {
                $( "#errors" ).html(output).addClass("alert alert-danger").slideDown("slow").delay(5000).slideUp("slow");
            } 
            else 
            {
                $( "#errors" ).html(output).addClass("alert alert-danger").delay(5000).slideUp("slow");
            }
        },
        complete: function(p_xhr, p_status)
        {
            //alert("complete");
        } 
    });
};