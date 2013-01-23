//version 1.0 1/15/2013 DBW example file

//copyright 2013 Naomi Kennedy
//This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
//This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

//remember when running this from ExtendScript that you need to change the Dropdown menu at the top to "Adobe InDesign CS6"

var myDocument = app.activeDocument;
//our files have a standard naming convention that has the InDesign files name beginning with the ISBN
//I have editied this script since the persentation so it doesn't do the extra check for "_EPUB" in the file name
var theEpubISBN = (myDocument.name).substring(0, 13);


checkForMetadata ();
setEPubExportOptions();
//Export the file to the same folder as the InDesign file. to change the name edit "/" + theEpubISBN + "_EPUB.epub"
myDocument.exportFile(ExportFormat.EPUB, File(myDocument.filePath + "/" + theEpubISBN + "_EPUB.epub"), true);

function setEPubExportOptions(){
    myDocument.epubExportPreferences.embedFont = false;
    //set the ISBN to document name without file extention
    myDocument.epubExportPreferences.id = theEpubISBN;
    myDocument.epubExportPreferences.preserveLocalOverride = false;
    myDocument.epubExportPreferences.imageExportResolution = ImageResolution.PPI_300;
    //if you are working in earlier versions, the following line won't work
    myDocument.epubExportPreferences.version = EpubVersion.EPUB2;
    myDocument.epubExportPreferences.jpegOptionsQuality = JPEGOptionsQuality.HIGH;
    myDocument.epubExportPreferences.imageConversion = ImageConversion.JPEG;
    //add your publisher metadata between the quotes below
    myDocument.epubExportPreferences.epubPublisher = "";
}
function checkForMetadata (){
    //if either author or title is empty
    if ((myDocument.metadataPreferences.author == "")||(myDocument.metadataPreferences.documentTitle == "")){
        //create a dialog with entry fields, if author or title existed, will fill out fields
        var myWindow = new Window ("dialog", "Metadata");
            var myAuthorInputGroup = myWindow.add ("group");
            myAuthorInputGroup.add ("statictext", undefined, "Author:");
            var myAuthorText = myAuthorInputGroup.add ("edittext", undefined, myDocument.metadataPreferences.author);
                myAuthorText.characters = 30;
                myAuthorText.active = true;
            var myTitleInputGroup = myWindow.add ("group");
            myTitleInputGroup.add ("statictext", undefined, "Title:");
            var myTitleText = myTitleInputGroup.add ("edittext", undefined, myDocument.metadataPreferences.documentTitle);
                myTitleText.characters = 30;
        var myStaticTextGroup = myWindow.add ("group");
        myStaticTextGroup.add ("statictext", undefined, "Remember: You must set the document title and author for the file to pass KindleGen");
        var myButtonGroup = myWindow.add ("group");
            myButtonGroup.alignment = "right";
            myButtonGroup.add ("button", undefined, "OK");
            myButtonGroup.add ("button", undefined, "Cancel");
        myMetadataResult = myWindow.show ();
        //if cancel wasn't clicked, set the metadata for the document
        if (myMetadataResult == true){
            myDocument.metadataPreferences.author = myAuthorText.text;
            myDocument.metadataPreferences.documentTitle = myTitleText.text;
            //removes window from memory
            myWindow.close();
        }
        else {
             myWindow.close();
       }
    }
}
