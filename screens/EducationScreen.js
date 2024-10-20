import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Dropdown from '../components/education/Dropdown'; // Adjust the path based on your structure

const EducationScreen = () => {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            <SafeAreaView>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={30} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Resources</Text>
                </View>
            </SafeAreaView>

            <Image
                source={require('../assets/resources2.png')}
                style={styles.banner}
                resizeMode="cover"
            />

            {/* Financial Education Resources */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionHeader}>Financial Education Resources</Text>
                <Dropdown 
                    title="Building Credit Score"
                    icon={require('../assets/creditScore.jpg')} // Adjust the icon path
                    content={
                        <View>
                            <Text style={styles.bulletPoint}>• Pay bills on time</Text>
                            <Text style={styles.bulletPoint}>• Keep credit card balances low (ideally under 30% of your credit limit)</Text>
                            <Text style={styles.bulletPoint}>• Monitor your credit report for errors at least once a year</Text>
                            <Text style={styles.bulletPoint}>• Limit new credit inquiries</Text>
                        </View>
                    }
                />
                <Dropdown 
                    title="How to Get A Credit Card"
                    icon={require('../assets/creditCard.jpg')} // Adjust the icon path
                    content={
                        <View>
                            <Text style={styles.bulletPoint}>• Research various credit card options</Text>
                            <Text style={styles.bulletPoint}>• Compare interest rates and fees</Text>
                            <Text style={styles.bulletPoint}>• Start with a secured credit card if new to credit</Text>
                            <Text style={styles.bulletPoint}>• Read terms and conditions carefully before applying</Text>
                        </View>
                    }
                />
                <Dropdown 
                    title="Budgeting Basics"
                    icon={require('../assets/budget.png')} // Adjust the icon path
                    content={
                        <View>
                            <Text style={styles.bulletPoint}>• Track your income and expenses</Text>
                            <Text style={styles.bulletPoint}>• Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings/debt repayment</Text>
                            <Text style={styles.bulletPoint}>• Regularly review and adjust your budget</Text>
                            <Text style={styles.bulletPoint}>• Use budgeting apps or spreadsheets for tracking</Text>
                        </View>
                    }
                />
                <Dropdown 
                    title="Understanding Loans"
                    icon={require('../assets/loan.jpg')} // Adjust the icon path
                    content={
                        <View>
                            <Text style={styles.bulletPoint}>• Understand terms, interest rates, and repayment schedules</Text>
                            <Text style={styles.bulletPoint}>• Assess your ability to repay before taking out a loan</Text>
                            <Text style={styles.bulletPoint}>• Avoid high-interest loans whenever possible</Text>
                            <Text style={styles.bulletPoint}>• Consider consolidating loans for better rates</Text>
                        </View>
                    }
                />
                <Dropdown 
                    title="Investing 101"
                    icon={require('../assets/investing.png')} // Adjust the icon path
                    content={
                        <View>
                            <Text style={styles.bulletPoint}>• Learn about stocks, bonds, and mutual funds</Text>
                            <Text style={styles.bulletPoint}>• Diversify your portfolio to mitigate risk</Text>
                            <Text style={styles.bulletPoint}>• Start with low-cost index funds for beginners</Text>
                            <Text style={styles.bulletPoint}>• Understand the basics of market trends and analysis</Text>
                        </View>
                    }
                />
                <Dropdown 
                    title="Understanding Taxes"
                    icon={require('../assets/taxes.jpg')} // Adjust the icon path
                    content={
                        <View>
                            <Text style={styles.bulletPoint}>• Familiarize yourself with tax brackets and deductions</Text>
                            <Text style={styles.bulletPoint}>• Keep accurate records of your income and expenses</Text>
                            <Text style={styles.bulletPoint}>• Consider using tax preparation software or a tax professional</Text>
                            <Text style={styles.bulletPoint}>• Stay informed about tax law changes annually</Text>
                        </View>
                    }
                />
            </View>

            {/* Healthcare Resources */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionHeader}>Healthcare Resources</Text>
                <Dropdown 
                    title="Health Care Tips"
                    icon={require('../assets/healthCare.jpg')} // Adjust the icon path
                    content={
                        <View>
                            <Text style={styles.bulletPoint}>• Review your health insurance coverage options</Text>
                            <Text style={styles.bulletPoint}>• Know your deductible and out-of-pocket costs</Text>
                            <Text style={styles.bulletPoint}>• Use in-network providers to minimize costs</Text>
                            <Text style={styles.bulletPoint}>• Utilize telemedicine services when possible</Text>
                        </View>
                    }
                />
                <Dropdown 
                    title="Preventive Care Guidelines"
                    icon={require('../assets/preventCare.jpg')} // Adjust the icon path
                    content={
                        <View>
                            <Text style={styles.bulletPoint}>• Schedule regular check-ups and screenings</Text>
                            <Text style={styles.bulletPoint}>• Stay updated on vaccinations as recommended</Text>
                            <Text style={styles.bulletPoint}>• Discuss any health concerns with your healthcare provider</Text>
                            <Text style={styles.bulletPoint}>• Keep a personal health record for easy access</Text>
                        </View>
                    }
                />
                <Dropdown 
                    title="Healthy Eating on a Budget"
                    icon={require('../assets/healthyEating.jpg')} // Adjust the icon path
                    content={
                        <View>
                            <Text style={styles.bulletPoint}>• Plan meals to avoid impulse purchases</Text>
                            <Text style={styles.bulletPoint}>• Buy in bulk and choose seasonal produce</Text>
                            <Text style={styles.bulletPoint}>• Focus on whole foods and limit processed items</Text>
                            <Text style={styles.bulletPoint}>• Use coupons and take advantage of sales</Text>
                        </View>
                    }
                />
                <Dropdown 
                    title="Mental Health Resources"
                    icon={require('../assets/mentalHealth.png')} // Adjust the icon path
                    content={
                        <View>
                            <Text style={styles.bulletPoint}>• Reach out to mental health professionals when needed</Text>
                            <Text style={styles.bulletPoint}>• Utilize hotlines for immediate support</Text>
                            <Text style={styles.bulletPoint}>• Practice self-care techniques like meditation or yoga</Text>
                            <Text style={styles.bulletPoint}>• Maintain a support system of friends and family</Text>
                        </View>
                    }
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    banner: {
        width: '100%',
        height: 200,
        marginBottom: 20,
    },
    sectionContainer: {
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#333',
    },
    bulletPoint: {
        fontSize: 16,          // Size of the bullet point text
        lineHeight: 24,        // Space between lines
        color: '#555',         // Color of the bullet point text
        marginBottom: 5,       // Space between bullet points
    },
});

export default EducationScreen;
