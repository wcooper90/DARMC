// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define({"widgets/ParcelDrafter/nls/strings":{_widgetLabel:"Projektant dzia\u0142ek",newTraverseButtonLabel:"Rozpocznij nowy ci\u0105g poligonowy",invalidConfigMsg:"Nieprawid\u0142owa konfiguracja",geometryServiceURLNotFoundMSG:"Nie mo\u017cna uzyska\u0107 adresu URL us\u0142ugi geometrii",editTraverseButtonLabel:"Edytuj ci\u0105g poligonowy",mapTooltipForStartNewTraverse:"Wybierz punkt na mapie lub pisz poni\u017cej, aby rozpocz\u0105\u0107",mapTooltipForEditNewTraverse:"Wybierz dzia\u0142k\u0119 do edycji",
mapTooltipForUpdateStartPoint:"Kliknij, aby zaktualizowa\u0107 punkt pocz\u0105tkowy",mapTooltipForScreenDigitization:"Kliknij, aby doda\u0107 punkt dzia\u0142ki",mapTooltipForUpdatingRotaionPoint:"Kliknij, aby zaktualizowa\u0107 punkt obrotu",mapTooltipForRotate:"Drag to rotate",mapTooltipForScale:"Przeci\u0105gnij, aby zmieni\u0107 skal\u0119",backButtonTooltip:"Powr\u00f3t",newTraverseTitle:"Nowy ci\u0105g poligonowy",editTraverseTitle:"Edytuj ci\u0105g poligonowy",clearingDataConfirmationMessage:"Zmiany zostan\u0105 odrzucone. Czy chcesz kontynuowa\u0107?",
unableToFetchParcelMessage:"Nie mo\u017cna pobra\u0107 dzia\u0142ki.",unableToFetchParcelLinesMessage:"Nie mo\u017cna pobra\u0107 linii dzia\u0142ki.",planSettings:{planSettingsTitle:"Parametry",directionOrAngleTypeLabel:"Typ kierunku lub k\u0105ta",directionOrAngleUnitsLabel:"Jednostki kierunku lub k\u0105ta",distanceAndLengthUnitsLabel:"Jednostki odleg\u0142o\u015bci i d\u0142ugo\u015bci",areaUnitsLabel:"Jednostki powierzchni",circularCurveParameters:"Parametry \u0142uku ko\u0142owego",northAzimuth:"Azymut p\u00f3\u0142nocny",
southAzimuth:"Azymut po\u0142udniowy",quadrantBearing:"Czwartak",radiusAndChordLength:"D\u0142ugo\u015b\u0107 promienia i ci\u0119ciwy",radiusAndArcLength:"D\u0142ugo\u015b\u0107 promienia i \u0142uku",expandGridTooltipText:"Rozwi\u0144 siatk\u0119",collapseGridTooltipText:"Zwi\u0144 siatk\u0119",zoomToLocationTooltipText:"Powi\u0119ksz do lokalizacji",onScreenDigitizationTooltipText:"Digitalizuj",updateRotationPointTooltipText:"Aktualizuj punkt obrotu"},traverseSettings:{bearingLabel:"K\u0105t kierunkowy",
lengthLabel:"d\u0142ugo\u015b\u0107",radiusLabel:"Promie\u0144",noMiscloseCalculated:"Nie obliczono odchylenia",traverseMiscloseBearing:"K\u0105t kierunkowy odchylenia",traverseAccuracy:"Dok\u0142adno\u015b\u0107",accuracyHigh:"Wysoki",traverseDistance:"Odleg\u0142o\u015b\u0107 odchylenia",traverseMiscloseRatio:"Wsp\u00f3\u0142czynnik odchylenia",traverseStatedArea:"Zadeklarowana powierzchnia",traverseCalculatedArea:"Obliczona powierzchnia",addButtonTitle:"Dodaj",deleteButtonTitle:"Usu\u0144"},parcelTools:{rotationToolLabel:"K\u0105t",
scaleToolLabel:"Skala"},newTraverse:{invalidBearingMessage:"Nieprawid\u0142owy k\u0105t kierunkowy.",invalidLengthMessage:"Nieprawid\u0142owa d\u0142ugo\u015b\u0107.",invalidRadiusMessage:"Nieprawid\u0142owy promie\u0144.",negativeLengthMessage:"Prawid\u0142owe tylko dla krzywych",enterValidValuesMessage:"Wprowad\u017a prawid\u0142owe warto\u015bci.",enterValidParcelInfoMessage:"Wprowad\u017a prawid\u0142owe informacje o dzia\u0142kach, aby mo\u017cna by\u0142o je zapisa\u0107.",unableToDrawLineMessage:"Nie mo\u017cna narysowa\u0107 linii.",
invalidEndPointMessage:"Nieprawid\u0142owy punkt ko\u0144cowy. Nie mo\u017cna narysowa\u0107 linii.",lineTypeLabel:"Typ linii"},planInfo:{requiredText:"(wymagane)",optionalText:"(opcja)",parcelNamePlaceholderText:"Nazwa dzia\u0142ki",parcelDocumentTypeText:"Typ dokumentu",planNamePlaceholderText:"Nazwa planu",cancelButtonLabel:"Anuluj",saveButtonLabel:"Zapisz",saveNonClosedParcelConfirmationMessage:"Wprowadzona dzia\u0142ka nie jest zamkni\u0119ta. Czy mimo to chcesz kontynuowa\u0107 i zapisa\u0107 tylko linie dzia\u0142ki?",
unableToCreatePolygonParcel:"Nie mo\u017cna utworzy\u0107 poligonu dzia\u0142ki.",unableToSavePolygonParcel:"Nie mo\u017cna zapisa\u0107 poligonu dzia\u0142ki.",unableToSaveParcelLines:"Nie mo\u017cna zapisa\u0107 linii dzia\u0142ki.",unableToUpdateParcelLines:"Nie mo\u017cna zaktualizowa\u0107 linii dzia\u0142ki.",parcelSavedSuccessMessage:"Pomy\u015blnie zapisano dzia\u0142k\u0119.",parcelDeletedSuccessMessage:"Dzia\u0142ka zosta\u0142a pomy\u015blnie usuni\u0119ta.",parcelDeleteErrorMessage:"B\u0142\u0105d usuwania dzia\u0142ki.",
enterValidParcelNameMessage:"Wprowad\u017a prawid\u0142ow\u0105 nazw\u0119 dzia\u0142ki.",enterValidPlanNameMessage:"Wprowad\u017a prawid\u0142ow\u0105 nazw\u0119 planu.",enterValidDocumentTypeMessage:"Nieprawid\u0142owy typ dokumentu.",enterValidStatedAreaNameMessage:"Wprowad\u017a prawid\u0142ow\u0105 zadeklarowan\u0105 powierzchni\u0119."},xyInput:{explanation:"Wprowad\u017a wsp\u00f3\u0142rz\u0119dne w tym samym odniesieniu przestrzennym, kt\u00f3re jest u\u017cywane w tej warstwie"},_localized:{}}});