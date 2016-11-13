$(document).ready(function($) {
	WebFont.load({
		google: {
			families: ['Press Start 2P']
		}
	});	
});

$('#btn').on('click', function(event) {
	event.preventDefault();
	/* Act on the event */
	authorize(event);
	// $('#reg').addClass('is-active');
});

$('#reg button.delete').on('click', function(event) {
	event.preventDefault();
	/* Act on the event */
	$('#reg').removeClass('is-active');
});

var clientId = '103212263499-8acgob9gddeccbictgmdv94lapio18d2.apps.googleusercontent.com',
	scopes = ['https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/plus.profile.emails.read'];

/**
  * Response callback for when the API client receives a response.
  *
  * @param resp The API response object with the user email and profile information.
  */
function handleEmailResponse(resp) {
    'use strict';
    console.log(resp);
    if (!resp.error) {
        var primaryEmail;
        if (resp.emails) {
            for (var i = 0; i < resp.emails.length; i++) {
                if (resp.emails[i].type === 'account') {
                    primaryEmail = resp.emails[i].value;
                }
            }

            $('input[name="entry.1643645516"]').val(primaryEmail);

        }

        if(resp.displayName) {
        	$('input[name="entry.179769443"]').val(resp.displayName);
        }

        $('#reg').addClass('is-active');
        $('input[name="entry.1603266961"]').focus();

    }
}


/**
  * Sets up an API call after the Google API client loads.
  */
function apiClientLoaded() {
    'use strict';
    gapi.client.plus.people.get({ userId: 'me' }).execute(handleEmailResponse);
}



function authorize(event) {
    'use strict';
    // Handles the authorization flow.
    // `immediate` should be false when invoked from the button click.
    // addProgress(0.13);
    var useImmdiate = event ? false : true;

    /*eslint-disable camelcase*/
    var authData = {
        client_id: clientId,
        scope: scopes,
        immediate: useImmdiate
    };
    /*eslint-enable camelcase*/

    gapi.auth.authorize(authData, function(response) {

        if (response.error) {
        	console.info(response.error);
        } else {
        	console.log(response);
            gapi.client.load('plus', 'v1', apiClientLoaded);

        }
    });
}


// // replace "ss-submit" with the ID of your submit button
// document.getElementById("ss-submit").addEventListener("click", function(){
//   alert("It works!")
//   // replace "ss-form" with the ID of your form
//   document.getElementById("reg").reset();
// });