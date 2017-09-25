var CONTACT_URL = "contact-url-needed";

Vue.use(VeeValidate);
new Vue({
  el: '#app',
  data: function() {
        return {
          model: {
            name: '',
            email: '',
            message: ''
          	}
          }
        },
  methods: {
    submitForm: function () {
		console.log(this.model)
		$.ajax({
		url: CONTACT_URL,
		type: 'post',
		data: {
		name: 'name',
		email: 'email',
		message: 'message'
		},
		success: function (response) {
			alert("Thank you for contacting us");
		},
		error: function (xhr, ajaxOptions, thrownError) {
			alert(xhr.status + " " + thrownError);
		}
      })
    }
  }
})