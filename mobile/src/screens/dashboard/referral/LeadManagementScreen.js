import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    TextInput,
    SafeAreaView,
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DashboardService } from '../../../services/dashboardService';
import ReferralLeadModal from './ReferralLeadModal';
import { useFocusEffect } from '@react-navigation/native';
import theme from '../../../constants/theme';
import LeadFormDataModal from './LeadFormDataModal';
import LeadDocumentsModal from './LeadDocumentsModal';

export default function LeadManagementScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState('referral'); // 'referral' or 'detailed'
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Docs Modal
    const [selectedLeadForDocs, setSelectedLeadForDocs] = useState(null);
    const [isDocsModalVisible, setIsDocsModalVisible] = useState(false);

    // Form Data Modal
    const [selectedLeadForForm, setSelectedLeadForForm] = useState(null);
    const [isFormModalVisible, setIsFormModalVisible] = useState(false);

    const pageSizeOptions = [5, 10, 15, 20];

    const fetchLeads = useCallback(async (showLoading = true) => {
        try {
            if (showLoading) setLoading(true);
            if (activeTab === 'referral') {
                const response = await DashboardService.getLeads();
                if (response.success && Array.isArray(response.data)) {
                    setLeads(response.data);
                } else {
                    setLeads([]);
                }
            } else {
                const response = await DashboardService.getMyLeads();
                if (response.success && Array.isArray(response.data)) {
                    // Map Detailed Leads
                    const mapped = response.data.map(item => ({
                        id: item.id,
                        ref_id: item.detail_lead_id,
                        lead_name:item.lead_name ||  item.form_data?.clientName || item.client?.name || item.name || "N/A",
                        contact_number:item.contact_number ||  item.form_data?.phone || item.client?.mobile || item.mobile || "N/A",
                        email: item.form_data?.email || item.client?.email || item.email || "-",
                        department: item.department,
                        sub_category: item.sub_category,
                        is_self_login: item.meta?.is_self_login ? "Yes" : "No", // Explicit "Yes"/"No"
                        notes: item.meta?.is_self_login ? "Self Login" : "-", // Keep notes for generic usage if needed
                        created_at: item.created_at,
                        original: item
                    }));
                    setLeads(mapped);
                } else {
                    setLeads([]);
                }
            }
        } catch (error) {
            console.error("Failed to fetch leads", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [activeTab]);

    useFocusEffect(
        useCallback(() => {
            fetchLeads(true);
        }, [fetchLeads])
    );

    const onRefresh = () => {
        setRefreshing(true);
        fetchLeads(false);
    };

    const handleViewDocs = (lead) => {
        setSelectedLeadForDocs(lead);
        setIsDocsModalVisible(true);
    };

    const handleViewForm = (lead) => {
        setSelectedLeadForForm(lead);
        setIsFormModalVisible(true);
    };

    const filteredLeads = leads.filter(lead => {
        const query = searchQuery.toLowerCase();
        return (
            (lead.lead_name && lead.lead_name.toLowerCase().includes(query)) ||
            (lead.ref_id && lead.ref_id.toLowerCase().includes(query)) ||
            (lead.contact_number && lead.contact_number.includes(query)) ||
            (lead.department && lead.department.toLowerCase().includes(query)) ||
            (lead.sub_category && lead.sub_category.toLowerCase().includes(query)) ||
            (lead.email && lead.email.toLowerCase().includes(query))
        );
    }).slice(0, pageSize);

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        const d = date.getDate().toString().padStart(2, '0');
        const m = (date.getMonth() + 1).toString().padStart(2, '0');
        const y = date.getFullYear();
        const h = date.getHours().toString().padStart(2, '0');
        const min = date.getMinutes().toString().padStart(2, '0');
        const s = date.getSeconds().toString().padStart(2, '0');
        return `${d}/${m}/${y}\n${h}:${min}:${s}`;
    };

    // --- REFERRAL LEADS COMPONENTS ---
    const ReferralListHeader = () => (
        <View style={styles.headerRow}>
            <Text style={[styles.headerCell, styles.idCol]}>ID</Text>
            <Text style={[styles.headerCell, styles.refIdCol]}>Ref ID</Text>
            <Text style={[styles.headerCell, styles.clientCol]}>Client</Text>
            <Text style={[styles.headerCell, styles.contactCol]}>Contact</Text>
            <Text style={[styles.headerCell, styles.deptCol]}>Dept</Text>
            <Text style={[styles.headerCell, styles.productCol]}>Product</Text>
            <Text style={[styles.headerCell, styles.notesCol]}>Notes</Text>
            <Text style={[styles.headerCell, styles.dateCol]}>Created</Text>
        </View>
    );

    const renderReferralItem = ({ item, index }) => (
        <View style={[styles.row, index % 2 === 1 && { backgroundColor: theme.colors.rowAlternate }]}>
            <Text style={[styles.cell, styles.idCol]}>{item.id}</Text>
            <Text style={[styles.cell, styles.refIdCol, styles.boldText]}>{item.ref_id}</Text>
            <Text style={[styles.cell, styles.clientCol]} numberOfLines={1}>{item.lead_name}</Text>
            <Text style={[styles.cell, styles.contactCol]}>{item.contact_number}</Text>
            <Text style={[styles.cell, styles.deptCol]}>{item.department}</Text>
            <Text style={[styles.cell, styles.productCol]} numberOfLines={1}>{item.sub_category || '-'}</Text>
            <Text style={[styles.cell, styles.notesCol]} numberOfLines={1}>{item.notes || '-'}</Text>
            <Text style={[styles.cell, styles.dateCol]}>{formatDate(item.created_at)}</Text>
        </View>
    );

    // --- DETAILED LEADS COMPONENTS ---
    // Columns: ID, Lead ID, Lead Name, Contact, Email, Dept, Sub Category, Self Login, Actions, Created
    const DetailedListHeader = () => (
        <View style={styles.headerRow}>
            <Text style={[styles.headerCell, styles.idCol]}>ID</Text>
            <Text style={[styles.headerCell, styles.refIdCol]}>Lead ID</Text>
            <Text style={[styles.headerCell, styles.clientCol]}>Lead Name</Text>
            <Text style={[styles.headerCell, styles.contactCol]}>Contact</Text>
            <Text style={[styles.headerCell, styles.emailCol]}>Email</Text>
            <Text style={[styles.headerCell, styles.deptCol]}>Dept</Text>
            <Text style={[styles.headerCell, styles.productCol]}>Sub Category</Text>
            <Text style={[styles.headerCell, styles.selfLoginCol]}>Self Login</Text>
            <Text style={[styles.headerCell, styles.actionCol]}>Actions</Text>
            <Text style={[styles.headerCell, styles.dateCol]}>Created</Text>
        </View>
    );

    const renderDetailedItem = ({ item, index }) => (
        <View style={[styles.row, index % 2 === 1 && { backgroundColor: theme.colors.rowAlternate }]}>
            <Text style={[styles.cell, styles.idCol]}>{item.id}</Text>
            <Text style={[styles.cell, styles.refIdCol, styles.boldText]}>{item.ref_id}</Text>
            <Text style={[styles.cell, styles.clientCol]} numberOfLines={1}>{item.lead_name}</Text>
            <Text style={[styles.cell, styles.contactCol]}>{item.contact_number}</Text>
            <Text style={[styles.cell, styles.emailCol]} numberOfLines={1}>{item.email}</Text>
            <Text style={[styles.cell, styles.deptCol]}>{item.department}</Text>
            <Text style={[styles.cell, styles.productCol]} numberOfLines={1}>{item.sub_category || '-'}</Text>
            <Text style={[styles.cell, styles.selfLoginCol]}>{item.is_self_login}</Text>

            <View style={[styles.cell, styles.actionCol]}>
                <TouchableOpacity style={[styles.docsBtn, styles.viewDocsBtn]} onPress={() => handleViewDocs(item)}>
                    <Text style={[styles.docsBtnText, { color: '#2563EB' }]}>VIEW DOCS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.docsBtn, styles.viewFormBtn]} onPress={() => handleViewForm(item)}>
                    <Text style={[styles.docsBtnText, { color: '#475569' }]}>VIEW FORM</Text>
                </TouchableOpacity>
            </View>

            <Text style={[styles.cell, styles.dateCol]}>{formatDate(item.created_at)}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.brandBlue]} />
                }
            >
                <View style={styles.mainContent}>

                    {/* <View style={styles.pageHeader}>
                        <Text style={styles.title}>Lead Management</Text>
                        <Text style={styles.subtitle}>
                            Efficiently manage your sales pipeline from initial contact to conversion.
                        </Text>
                    </View> */}

                    {/* Top Buttons - Side by Side */}
                    <View style={styles.actionButtonsRow}>
                        <TouchableOpacity
                            style={[styles.actionBtn, styles.referralBtn]}
                            onPress={() => setIsModalVisible(true)}
                        >
                            <Ionicons name="person-add-outline" size={18} color={theme.colors.brandBlue} />
                            <Text style={styles.referralBtnText}>Referral Lead</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionBtn, styles.detailedBtn]}
                            onPress={() => navigation.navigate('AddDetailedLead')}
                        >
                            <Ionicons name="add" size={20} color={theme.colors.white} />
                            <Text style={styles.detailedBtnText}>Add Detailed Lead</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Summary Row / Tabs */}
                    <View style={styles.tabsContainer}>
                        <TouchableOpacity
                            style={[styles.tab, activeTab === 'referral' && styles.activeTab]}
                            onPress={() => setActiveTab('referral')}
                        >
                            <Text style={[styles.tabText, activeTab === 'referral' && styles.activeTabText]}>
                                Referral Leads
                            </Text>
                            <View style={[styles.countBadge, activeTab === 'referral' ? styles.activeCountBadge : styles.inactiveCountBadge]}>
                                <Text style={[styles.countText, activeTab === 'referral' ? styles.activeCountText : styles.inactiveCountText]}>
                                    {activeTab === 'referral' ? leads.length : '0'}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.tab, activeTab === 'detailed' && styles.activeTab]}
                            onPress={() => setActiveTab('detailed')}
                        >
                            <Text style={[styles.tabText, activeTab === 'detailed' && styles.activeTabText]}>
                                Detailed Leads
                            </Text>
                            <View style={[styles.countBadge, activeTab === 'detailed' ? styles.activeCountBadge : styles.inactiveCountBadge]}>
                                <Text style={[styles.countText, activeTab === 'detailed' ? styles.activeCountText : styles.inactiveCountText]}>
                                    {activeTab === 'detailed' ? leads.length : '0'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Combined Filter & Search Row */}
                    <View style={styles.filterSearchRow}>
                        <View style={styles.pageSizeWrapper}>
                            {pageSizeOptions.map(size => (
                                <TouchableOpacity
                                    key={size}
                                    style={[styles.pageSizeOption, pageSize === size && styles.activePageSize]}
                                    onPress={() => setPageSize(size)}
                                >
                                    <Text style={[styles.pageSizeText, pageSize === size && styles.activePageSizeText]}>{size}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.searchContainer}>
                            <Ionicons name="search" size={18} color={theme.colors.textSecondary} style={styles.searchIcon} />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search Ref ID, Client..."
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />
                            {searchQuery.length > 0 && (
                                <TouchableOpacity onPress={() => setSearchQuery('')}>
                                    <Ionicons name="close-circle" size={18} color={theme.colors.textSecondary} />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    {/* Scrollable Table Content */}
                    <View style={styles.tableCard}>
                        <Text style={styles.sectionHeading}>{activeTab === 'referral' ? 'Referral Leads' : 'Detailed Leads'}</Text>
                        {loading && !refreshing ? (
                            <ActivityIndicator size="large" color={theme.colors.brandBlue} style={{ padding: 40 }} />
                        ) : (
                            <View style={styles.tableWrapper}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                                    <FlatList
                                        data={filteredLeads}
                                        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                                        ListHeaderComponent={activeTab === 'referral' ? ReferralListHeader : DetailedListHeader}
                                        stickyHeaderIndices={[0]}
                                        renderItem={activeTab === 'referral' ? renderReferralItem : renderDetailedItem}
                                        ListEmptyComponent={() => (
                                            <View style={styles.emptyState}>
                                                <Text style={styles.emptyText}>No leads found</Text>
                                            </View>
                                        )}
                                        contentContainerStyle={{ paddingBottom: 20 }}
                                        scrollEnabled={false}
                                    />
                                </ScrollView>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>

            <ReferralLeadModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSuccess={() => fetchLeads(false)}
            />

            <LeadDocumentsModal
                visible={isDocsModalVisible}
                onClose={() => setIsDocsModalVisible(false)}
                lead={selectedLeadForDocs}
            />

            <LeadFormDataModal
                visible={isFormModalVisible}
                onClose={() => setIsFormModalVisible(false)}
                lead={selectedLeadForForm}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    mainContent: {
        padding: 20,
    },
    pageHeader: {
        marginBottom: 32,
        marginTop: 8,
    },
    title: {
        ...theme.typography.h1,
        color: theme.colors.text,
    },
    subtitle: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
        marginTop: 6,
        fontWeight: '500',
    },
    actionButtonsRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    actionBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 12,
        ...theme.shadow,
    },
    referralBtn: {
        borderWidth: 1.5,
        borderColor: theme.colors.brandBlue,
        backgroundColor: theme.colors.white,
    },
    referralBtnText: {
        color: theme.colors.brandBlue,
        fontWeight: '700',
        marginLeft: 8,
        fontSize: 14,
    },
    detailedBtn: {
        backgroundColor: theme.colors.brandBlue,
    },
    detailedBtnText: {
        color: theme.colors.white,
        fontWeight: '700',
        marginLeft: 8,
        fontSize: 14,
    },
    tabsContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 24,
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.white,
        ...theme.shadow,
    },
    activeTab: {
        backgroundColor: theme.colors.brandBlue,
        borderColor: theme.colors.brandBlue,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.textSecondary,
    },
    activeTabText: {
        color: theme.colors.white,
    },
    countBadge: {
        marginLeft: 8,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
    },
    activeCountBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    inactiveCountBadge: {
        backgroundColor: '#F1F5F9',
    },
    countText: {
        fontSize: 11,
        fontWeight: '700',
    },
    activeCountText: {
        color: theme.colors.white,
    },
    inactiveCountText: {
        color: theme.colors.textSecondary,
    },
    filterSearchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 24,
    },
    pageSizeWrapper: {
        flexDirection: 'row',
        gap: 6,
    },
    pageSizeOption: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1.5,
        borderColor: theme.colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.white,
    },
    activePageSize: {
        backgroundColor: theme.colors.brandBlue,
        borderColor: theme.colors.brandBlue,
    },
    pageSizeText: {
        fontSize: 12,
        color: theme.colors.text,
        fontWeight: '700',
    },
    activePageSizeText: {
        color: theme.colors.white,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 52,
        ...theme.shadow,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: theme.colors.text,
        fontWeight: '500',
    },
    tableCard: {
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        borderRadius: 20,
        padding: 16,
        ...theme.shadow,
    },
    sectionHeading: {
        ...theme.typography.h3,
        color: theme.colors.text,
        marginBottom: 20,
    },
    tableWrapper: {
        flex: 1,
        borderRadius: 12,
        backgroundColor: theme.colors.white,
        overflow: 'hidden',
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#F1F5F9',
        paddingVertical: 16,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    headerCell: {
        ...theme.typography.label,
        fontSize: 10,
        color: '#475569',
        paddingHorizontal: 12,
        fontWeight: '800',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 18,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        backgroundColor: theme.colors.white,
        alignItems: 'center',
    },
    cell: {
        ...theme.typography.body,
        fontSize: 14,
        color: theme.colors.text,
        paddingHorizontal: 12,
        fontWeight: '500',
    },
    boldText: {
        fontWeight: '700',
        color: theme.colors.brandBlue,
    },
    // Column Widths
    idCol: { width: 60 },
    refIdCol: { width: 120 },
    clientCol: { width: 160 },
    contactCol: { width: 140 },
    emailCol: { width: 180 }, // NEW
    deptCol: { width: 110 },
    productCol: { width: 160 }, // Also used for Sub Category
    notesCol: { width: 220 }, // Generic notes for referral
    selfLoginCol: { width: 100 }, // NEW: Self Login
    actionCol: { width: 100, alignItems: 'center', justifyContent: 'center' },
    dateCol: { width: 120 },

    emptyState: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
        width: 1000,
    },
    emptyText: {
        color: theme.colors.textSecondary,
        fontSize: 15,
        fontWeight: '500',
    },

    docsBtn: {
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 4,
        marginBottom: 6,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1
    },
    viewDocsBtn: {
        backgroundColor: '#EFF6FF', // Light blue bg
        borderColor: '#BFDBFE'
    },
    viewFormBtn: {
        backgroundColor: '#F8FAFC', // Light gray bg
        borderColor: '#E2E8F0',
        marginBottom: 0
    },
    docsBtnText: {
        fontSize: 10,
        fontWeight: '800',
        textTransform: 'uppercase'
    },
});
