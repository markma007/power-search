
$(document).ready(()=>{

    const foo = $("input[type='radio']")

    foo.on('change', function (event) {
        chrome.storage.local.set({'searchLocation': $(event.target).val()})
    })

    chrome.storage.local.get(['searchLocation']).then((result)=>{
        if (result.hasOwnProperty('searchLocation')) {
            $(foo).attr('checked', false)
            $(foo).eq(result.searchLocation).attr('checked', true)
        } else { // 1
            $(foo).eq(0).attr('checked', true)
        }
    })
      

})