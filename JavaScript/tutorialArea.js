$('.TA-MainClose').click(function () {
    document.querySelector(".TA-GeneralSection").style.display = "none";
    document.querySelector(".TA-AccountSection").style.display = "none";
    document.querySelector(".TA-SelectionSection").style.display = "none";
    document.querySelector(".TA-ViewingSection").style.display = "none";
    document.querySelector(".TA-CreationSection").style.display = "none";
    document.querySelector(".TA-BunchSection").style.display = "none";
    document.querySelector(".TA-FilterSection").style.display = "none";
    document.querySelector(".TA-MainImportSection").style.display = "none";
    document.querySelector(".TA-ImportExportSection").style.display = "none";
    document.querySelector(".TA-TutorialMenu").style.display = "none";
    document.querySelector("#TutorialArea").style.display = "none";
});

$('.TA-SectionClose').click(function () {
    document.querySelector(".TA-GeneralSection").style.display = "none";
    document.querySelector(".TA-AccountSection").style.display = "none";
    document.querySelector(".TA-SelectionSection").style.display = "none";
    document.querySelector(".TA-ViewingSection").style.display = "none";
    document.querySelector(".TA-CreationSection").style.display = "none";
    document.querySelector(".TA-BunchSection").style.display = "none";
    document.querySelector(".TA-FilterSection").style.display = "none";
    document.querySelector(".TA-MainImportSection").style.display = "none";
    document.querySelector(".TA-ImportExportSection").style.display = "none";
    document.querySelector(".TA-TutorialMenu").style.display = "block";
});

$('.TA-General').click(function () {
    $('.TA-SectionClose').click();
    document.querySelector(".TA-TutorialMenu").style.display = "none";
    document.querySelector(".TA-GeneralSection").style.display = "block";
});

$('.TA-Account').click(function () {
    $('.TA-SectionClose').click();
    document.querySelector(".TA-TutorialMenu").style.display = "none";
    document.querySelector(".TA-AccountSection").style.display = "block";
});

$('.TA-Selection').click(function () {
    $('.TA-SectionClose').click();
    document.querySelector(".TA-TutorialMenu").style.display = "none";
    document.querySelector(".TA-SelectionSection").style.display = "block";
});

$('.TA-Viewing').click(function () {
    $('.TA-SectionClose').click();
    document.querySelector(".TA-TutorialMenu").style.display = "none";
    document.querySelector(".TA-ViewingSection").style.display = "block";
});

$('.TA-Creation').click(function () {
    $('.TA-SectionClose').click();
    document.querySelector(".TA-TutorialMenu").style.display = "none";
    document.querySelector(".TA-CreationSection").style.display = "block";
});

$('.TA-Bunch').click(function () {
    $('.TA-SectionClose').click();
    document.querySelector(".TA-TutorialMenu").style.display = "none";
    document.querySelector(".TA-BunchSection").style.display = "block";
});

$('.TA-Filter').click(function () {
    $('.TA-SectionClose').click();
    document.querySelector(".TA-TutorialMenu").style.display = "none";
    document.querySelector(".TA-FilterSection").style.display = "block";
});

$('.TA-MainImport').click(function () {
    $('.TA-SectionClose').click();
    document.querySelector(".TA-TutorialMenu").style.display = "none";
    document.querySelector(".TA-MainImportSection").style.display = "block";
});

$('.TA-ImportExport').click(function () {
    $('.TA-SectionClose').click();
    document.querySelector(".TA-TutorialMenu").style.display = "none";
    document.querySelector(".TA-ImportExportSection").style.display = "block";
});

function CloseTutorials() {
    $('.TA-MainClose').click();
}