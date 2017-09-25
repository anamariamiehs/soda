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
		$.ajax({
		url: CONTACT_URL,
		type: 'post',
		data: {
		name: this.model.name,
		email: this.model.email,
		message: this.model.message
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