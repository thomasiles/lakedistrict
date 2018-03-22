import { observable, computed, applyBindings, observableArray, components } from 'knockout';
import { Venue } from '../../Venue';
import * as template from './venueViewModel.html'

class ViewModel {
    // visibleVenues: KnockoutObservableArray<Venue>;
    allVenues: KnockoutComputed<Venue[]>;
    searchTerm: KnockoutObservable<string>;
    visibleVenues: KnockoutComputed<Venue[]>;
    currentVenue: KnockoutObservable<Venue>;

    constructor(params: any) {
        console.log('constructor called!');
        // this.visibleVenues = observableArray();
        this.allVenues = params.venues;
        this.searchTerm = observable();
        this.currentVenue = observable();
        this.visibleVenues = computed((): Venue[] => {
            const regex = new RegExp(this.searchTerm());
            const matchingVenues = this.allVenues().filter((v: Venue) => regex.test(v.name));
            return matchingVenues;
        }, this);
    }

    setCurrentVenue = (venue: Venue) => {
        console.log(this.currentVenue);
        this.currentVenue(venue);
    }
}

components.register('venue-list-widget', {
    viewModel: ViewModel,
    template: template
});