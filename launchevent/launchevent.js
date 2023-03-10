function onNewMessageComposeHandler(event) {
  setBody(event);
}
function onNewAppointmentComposeHandler(event) {
  setBody(event);
}
                           
function setBody()
{   
     Office.context.mailbox.item.getComposeTypeAsync(function(asyncResult) 
     {
      var composeType = "Default Value";
      if (asyncResult.status === Office.AsyncResultStatus.Succeeded) 
        {   
          composeType = asyncResult.value.composeType  
          if (composeType === "newMail")
             {
              Office.context.mailbox.item.body.getAsync(Office.CoercionType.Html,function (result) 
                {
               var newHtml = result.value.replace("</body>", "<br/ >ACAUTION: Please be aware that this email may be subject to public disclosure under the Freedom of Information Act or other authorities, though exceptions may apply for certain case-related information, personal privacy, and other matters.</body>")
               Office.context.mailbox.item.body.setAsync(newHtml, { coercionType: Office.CoercionType.Html });
                }                                                                                 
                                                                                                 );
             }
        } 
      else 
        {
        console.error(asyncResult.error);
        }
      }                                                                  );
}
                 if (Office.context.platform === Office.PlatformType.PC || Office.context.platform == null) 
                 {
                 Office.actions.associate("onNewMessageComposeHandler", onNewMessageComposeHandler);
                 Office.actions.associate("onNewAppointmentComposeHandler", onNewAppointmentComposeHandler);
                 }
