/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { CalendarModel } from "@web/views/calendar/calendar_model";
import { _t } from "@web/core/l10n/translation";

patch(CalendarModel.prototype, {
    async loadFilterSection(fieldName, filterInfo, previousSection) {
        const result = await super.loadFilterSection(...arguments);

        if (!result || !result.filters) {
            return result;
        }
        const field = this.meta.fields[fieldName];
        const isUserOrPartner = field && ["res.users", "res.partner"].includes(field.relation);

        const previousFilters = previousSection ? previousSection.filters : [];
        const previousAllFilter = previousFilters.find((f) => f.type === "all");

        if (!this.meta.allFilter) {
            this.meta.allFilter = {};
        }

        result.filters.push({
            type: "all",
            recordId: null,
            value: "all",
            label: isUserOrPartner ? _t("Everybody's calendars") : _t("Everything"),
            active: previousAllFilter
                ? previousAllFilter.active
                : (this.meta.allFilter[filterInfo.label] ?? true),
            canRemove: false,
            colorIndex: null,
            hasAvatar: false,
        });

        return result;
    },

    computeFiltersDomain(data) {
        const authorizedValues = {};
        const avoidValues = {};

        for (const [fieldName, filterSection] of Object.entries(data.filterSections)) {
            const filterAll = filterSection.filters.find((f) => f.type === "all");
            if (filterAll) {
                this.meta.allFilter = this.meta.allFilter || {};
                this.meta.allFilter[filterSection.label] = !!filterAll.active;
                if (filterAll.active) {
                    continue;
                }
            }

            const filterSectionInfo = this.meta.filtersInfo[fieldName];
            for (const filter of filterSection.filters) {
                if (filter.type === "all") {
                    continue;
                }
                if (filterSectionInfo.writeResModel) {
                    if (!authorizedValues[fieldName]) {
                        authorizedValues[fieldName] = [];
                    }
                    if (filter.active) {
                        authorizedValues[fieldName].push(filter.value);
                    }
                } else {
                    if (!filter.active) {
                        if (!avoidValues[fieldName]) {
                            avoidValues[fieldName] = [];
                        }
                        avoidValues[fieldName].push(filter.value);
                    }
                }
            }
        }

        const domain = [];
        for (const field in authorizedValues) {
            domain.push([field, "in", authorizedValues[field]]);
        }
        for (const field in avoidValues) {
            if (avoidValues[field].length > 0) {
                domain.push([field, "not in", avoidValues[field]]);
            }
        }
        return domain;
    },
});