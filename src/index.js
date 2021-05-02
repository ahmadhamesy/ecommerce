
import './scss/style.scss';
import './css/style.css';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/js/all.min'; 
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';
import 'jquery-ui-touch-punch/jquery.ui.touch-punch';



$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
    $('.add-to-cart-btn').click(function(){
        alert('اظف الى عربة الشراء');
    });

    $('#copyright').text("جميع الحقوق محفوظه للمتجر سنة" +new Date().getFullYear());

    $('.product-option input[type="radio"]').change(function(){
        $(this).parents('.product-option').siblings().removeClass('active');
        $(this).parents('.product-option').addClass('active');
    });

    $('[data-product-quantity]').on('change', function () {
        var newQuantity= $(this).val();
        var parent =$(this).parents('[data-product-info]');
        var pricePerUint = parent.attr('data-product-price');
        var totalPriceForProduct= newQuantity * pricePerUint;
        parent.find('.total-price-for-product').text(totalPriceForProduct +'$');
        parent.find('.total-price-for-product').text(totalPriceForProduct + '$');
        calculateTotelPrice();
        });
       
    $('[data-remove-form-cart]').click(function(){
        $(this).parents('[data-product-info]').r
    });
    $('[data-remove-from-cart]').click(function(){
        $(this).parents('[data-product-info]').remove();
        calculateTotelPrice();
    });
    function calculateTotelPrice() {
        var totalPriceForAllProducts = 0;
        $('[data-product-info]').each(function(){
            var pricePerUnit = $(this).attr('data-product-price');
            var quantity = $(this).find('[data-product-quantity]').val();
            var totalPriceForProduct = pricePerUnit * quantity;
            totalPriceForAllProducts = totalPriceForAllProducts + (totalPriceForProduct);
            $('#total-price-for-all-product').text(totalPriceForAllProducts + '$');
        });
    };

    var citiesByCountry ={
        sa:['جدة','الرياض'],
        sy:['حلب','دمشق'],
        lb:['طرابلس','بيروت'],
        eg:['القاهره','الاسكندريه'],
    };
    $('#form-checkout select[name="country"]').on( "change",function() {

        var country = $(this).val();
    
        // اجلب مدن هذا البلد من المصفوفة
        var cities = citiesByCountry[country];
    
    
        $('#form-checkout select[name="city"]').empty();
        $('#form-checkout select[name="city"]').append(
            '<option disabled selected value="">اختر المدينة</option>'
        );
    
    
        cities.forEach(function(city) {
          var newOption = $('<option></option>');
          newOption.text(city);
          newOption.val(city);
          $('#form-checkout select[name="city"]').append(newOption);
        });
      });

      $('#form-checkout input[name="payment_method"]').change( function(){
          var PatmentMethod=$(this).val();
          if (PatmentMethod === 'on_delivery'){
              $('#credit-card-info input').prop('disabled',true);
          }else{
            $('#credit-card-info input').prop('disabled',false);
          }
          $('#credit-card-info').toggle();
      });

        $("#price-range").slider({
          range: true,
          min: 50,
          max: 1000,
          step:50,
          values: [ 250, 800 ],
          slide: function( event, ui ) {
         $('#price-min').text(ui.values[0]);
         $('#price-max').text(ui.values[1]);
      }
    });
});